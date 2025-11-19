const fs = require('fs');
const path = require('path');

/**
 * 简化版 Markdown 转 JSON
 * 使用更直接的方法，避免复杂嵌套解析
 * 生成到 web/src/config 目录
 */

console.log('开始解析 README.md...');

const configDir = path.join(__dirname, 'web/src/config');

// 确保目录存在
if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
}

try {
    const mdContent = fs.readFileSync('README.md', 'utf-8');
    const lines = mdContent.split(/\r?\n/);
    const totalLines = lines.length;
    
    console.log(`共 ${totalLines} 行，开始转换...`);
    
    const config = {
        title: 'universe-document',
        banner: './assets/banner.png',
        warnings: [],
        copyright: 'Copyright 2025 © Gala Lab Corp. All Rights Reserved.',
        metadata: {
            sourceFile: 'README.md',
            totalLines: totalLines,
            conversionType: 'simplified'
        }
    };
    
    const sections = {};
    const rootContent = [];
    
    // 提取警告信息
    const warningRegex = />\s*\[!(IMPORTANT|CAUTION|NOTE)\]\s*\n>\s*\*\*(.+?)\*\*/gs;
    let warningMatch;
    while ((warningMatch = warningRegex.exec(mdContent)) !== null) {
        config.warnings.push({
            type: warningMatch[1],
            message: warningMatch[2].trim()
        });
    }
    
    // 提取标题
    const titleMatch = mdContent.match(/^#\s+(.+)$/m);
    if (titleMatch) {
        config.title = titleMatch[1].trim();
    }
    
    // 简化的解析：直接按行处理，保留原始结构
    let currentSection = null;
    let currentSubsection = null;
    let currentSubSubsection = null;
    let sectionContent = [];
    
    for (let i = 0; i < lines.length; i++) {
        if (i % 500 === 0 && i > 0) {
            console.log(`  进度: ${i}/${totalLines} (${((i/totalLines)*100).toFixed(1)}%)`);
        }
        
        const line = lines[i];
        const trimmed = line.trim();
        
        // 解析标题
        const h1Match = trimmed.match(/^#\s+(.+)$/);
        const h2Match = trimmed.match(/^##\s+(.+)$/);
        const h3Match = trimmed.match(/^###\s+(.+)$/);
        const h4Match = trimmed.match(/^####\s+(.+)$/);
        
        if (h1Match) {
            // H1 标题，重置
            currentSection = null;
            currentSubsection = null;
            currentSubSubsection = null;
            sectionContent = [];
        } else if (h2Match) {
            // H2 标题 - 主要章节
            currentSection = h2Match[1].trim();
            currentSubsection = null;
            currentSubSubsection = null;
            sectionContent = [];
            
            if (!sections[currentSection]) {
                sections[currentSection] = { 
                    title: currentSection, 
                    content: [],
                    subsections: {} 
                };
            }
        } else if (h3Match) {
            // H3 标题 - 子章节
            if (currentSection) {
                const subsectionTitle = h3Match[1].trim();
                currentSubsection = subsectionTitle;
                currentSubSubsection = null;
                
                if (!sections[currentSection].subsections) {
                    sections[currentSection].subsections = {};
                }
                
                if (!sections[currentSection].subsections[subsectionTitle]) {
                    sections[currentSection].subsections[subsectionTitle] = {
                        title: subsectionTitle,
                        content: [],
                        subsections: {}
                    };
                }
            }
        } else if (h4Match) {
            // H4 标题 - 子子章节
            if (currentSection && currentSubsection) {
                const subSubsectionTitle = h4Match[1].trim();
                currentSubSubsection = subSubsectionTitle;
                
                const subsection = sections[currentSection].subsections[currentSubsection];
                if (!subsection.subsections) {
                    subsection.subsections = {};
                }
                
                if (!subsection.subsections[subSubsectionTitle]) {
                    subsection.subsections[subSubsectionTitle] = {
                        title: subSubsectionTitle,
                        content: []
                    };
                }
            }
        } else if (trimmed) {
            // 有内容的行，根据内容特征识别类型
            let contentItem;
            
            // 识别内容类型（优先级从高到低）
            if (trimmed.match(/^```/)) {
                // 代码块开始标记
                const langMatch = trimmed.match(/^```(\w+)?/);
                contentItem = {
                    type: 'code_block',
                    language: langMatch ? (langMatch[1] || '') : '',
                    code: trimmed.replace(/^```\w*/, '').replace(/```$/, '')
                };
            } else if (trimmed.match(/^> /)) {
                // 引用块（blockquote）
                contentItem = {
                    type: 'blockquote',
                    quotes: [trimmed.replace(/^> /, '')]
                };
            } else if (trimmed.match(/^[-*+] /) || trimmed.match(/^\d+\. /)) {
                // 列表项（list）
                // 计算缩进（通过原始行的前导空格）
                const indent = Math.floor((line.match(/^(\s*)/)[1].length - trimmed.match(/^(\s*)/)[1].length) / 2);
                const content = trimmed.replace(/^[-*+] /, '').replace(/^\d+\. /, '');
                contentItem = {
                    type: 'list',
                    items: [{
                        content: content,
                        indent: indent
                    }]
                };
            } else if (trimmed.match(/^\|.+\|/)) {
                // 表格行（table）
                const cells = trimmed.split('|').map(c => c.trim()).filter(c => c && !c.match(/^-+$/));
                // 如果是分隔行（只有 - 和空格），跳过
                if (cells.length > 0 && !trimmed.match(/^\|[\s-]+\|$/)) {
                    contentItem = {
                        type: 'table',
                        table: {
                            headers: [],
                            rows: [cells]
                        }
                    };
                } else {
                    // 跳过分隔行
                    continue;
                }
            } else if (trimmed.match(/^<[^>]+>/)) {
                // HTML 标签（html）
                contentItem = {
                    type: 'html',
                    html: trimmed
                };
            } else {
                // 普通文本或段落（text/paragraph）
                // 如果内容较长（>100字符）或包含多个句子，视为段落
                const isParagraph = trimmed.length > 100 || (trimmed.match(/[.!?]\s+[A-Z]/g) && trimmed.match(/[.!?]\s+[A-Z]/g).length > 0);
                contentItem = {
                    type: isParagraph ? 'paragraph' : 'text',
                    content: trimmed
                };
                
                // 提取链接
                const linkMatches = trimmed.matchAll(/\[([^\]]+)\]\(([^\)]+)\)/g);
                const links = Array.from(linkMatches).map(m => ({ text: m[1], url: m[2] }));
                if (links.length > 0) {
                    contentItem.links = links;
                }
                
                // 提取图片
                const imgMatches = trimmed.matchAll(/!\[([^\]]*)\]\(([^\)]+)\)|<img[^>]+src=["']([^"']+)["'][^>]*alt=["']([^"']*)["']?[^>]*>/gi);
                const images = Array.from(imgMatches).map(m => ({
                    alt: m[1] || m[4] || '',
                    src: m[2] || m[3] || ''
                }));
                if (images.length > 0) {
                    contentItem.images = images;
                }
            }
            
            // 如果 contentItem 未定义，跳过这一行
            if (!contentItem) {
                continue;
            }
            
            // 添加到对应的章节
            if (currentSection && currentSubsection && currentSubSubsection) {
                // H4 子章节
                const subSubsection = sections[currentSection]
                    .subsections[currentSubsection]
                    .subsections[currentSubSubsection];
                subSubsection.content.push(contentItem);
            } else if (currentSection && currentSubsection) {
                // H3 子章节
                const subsection = sections[currentSection].subsections[currentSubsection];
                subsection.content.push(contentItem);
            } else if (currentSection) {
                // H2 主要章节
                const section = sections[currentSection];
                if (!section.content) {
                    section.content = [];
                }
                section.content.push(contentItem);
            } else {
                // 根内容
                rootContent.push(contentItem);
            }
        }
    }
    
    // 生成配置文件
    console.log('\n正在生成配置文件...');
    
    // 1. 生成 config.json
    const configPath = path.join(configDir, 'config.json');
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
    console.log('✓ 生成 config.json');
    
    // 2. 生成 root-content.json
    if (rootContent.length > 0) {
        const rootContentPath = path.join(configDir, 'root-content.json');
        fs.writeFileSync(rootContentPath, JSON.stringify(rootContent, null, 2), 'utf-8');
        console.log('✓ 生成 root-content.json');
    }
    
    // 3. 生成各个 section 的 JSON 文件并创建索引
    const index = {
        title: config.title,
        config: './config.json',
        rootContent: rootContent.length > 0 ? './root-content.json' : undefined,
        sections: {}
    };
    
    for (const [sectionKey, section] of Object.entries(sections)) {
        // 生成文件名（将特殊字符替换为普通字符，移除开头的连字符）
        let filename = sectionKey.replace(/[^\w\s\u4e00-\u9fa5]/g, '').replace(/\s+/g, '-').toLowerCase();
        filename = filename.replace(/^-+/, ''); // 移除开头的连字符
        if (!filename) {
            // 如果文件名为空（只有 emoji），使用 sectionKey 作为文件名
            filename = sectionKey.replace(/[^\w\s\u4e00-\u9fa5]/g, '').replace(/\s+/g, '-').toLowerCase() || 'section';
        }
        filename = filename + '.json';
        const sectionPath = path.join(configDir, filename);
        
        fs.writeFileSync(sectionPath, JSON.stringify(section, null, 2), 'utf-8');
        index.sections[sectionKey] = `./${filename}`;
        
        console.log(`✓ 生成 ${filename}`);
    }
    
    // 4. 生成 index.json
    const indexPath = path.join(configDir, 'index.json');
    fs.writeFileSync(indexPath, JSON.stringify(index, null, 2), 'utf-8');
    console.log('✓ 生成 index.json');
    
    console.log('\n✅ 转换完成！');
    console.log(`   包含 ${Object.keys(sections).length} 个主要章节`);
    console.log(`   所有文件已生成到: ${configDir}`);
    
} catch (error) {
    console.error('❌ 转换失败:', error);
    console.error(error.stack);
    process.exit(1);
}

