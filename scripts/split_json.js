const fs = require('fs');
const path = require('path');

/**
 * 将 README.json 拆分为多个文件，放入 config 文件夹
 */

try {
    console.log('开始拆分 README.json...');
    
    // 读取原始 JSON
    const data = JSON.parse(fs.readFileSync('README.json', 'utf-8'));
    
    // 创建 config 文件夹
    const configDir = 'config';
    if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
        console.log(`创建文件夹: ${configDir}`);
    }
    
    // 保存基本信息到 config.json
    const config = {
        title: data.title,
        banner: data.banner,
        warnings: data.warnings,
        copyright: data.copyright,
        metadata: data.metadata
    };
    
    fs.writeFileSync(
        path.join(configDir, 'config.json'),
        JSON.stringify(config, null, 2),
        'utf-8'
    );
    console.log('✓ 保存 config.json');
    
    // 保存根内容
    if (data.rootContent && data.rootContent.length > 0) {
        fs.writeFileSync(
            path.join(configDir, 'root-content.json'),
            JSON.stringify(data.rootContent, null, 2),
            'utf-8'
        );
        console.log('✓ 保存 root-content.json');
    }
    
    // 拆分各个章节
    const sectionNames = {
        '🌐 community': 'community',
        '⚙️ system': 'system',
        '🧪 formula': 'formula',
        '🚀 upgrade': 'upgrade',
        '🐶 pet': 'pet',
        '🐉 dungeons': 'dungeons',
        '🏠 housing': 'housing'
    };
    
    let sectionCount = 0;
    for (const [sectionKey, sectionData] of Object.entries(data.sections)) {
        const fileName = sectionNames[sectionKey] || sectionKey.toLowerCase().replace(/[^\w]/g, '-');
        const filePath = path.join(configDir, `${fileName}.json`);
        
        fs.writeFileSync(
            filePath,
            JSON.stringify(sectionData, null, 2),
            'utf-8'
        );
        
        sectionCount++;
        console.log(`✓ 保存 ${fileName}.json`);
    }
    
    // 创建索引文件，引用各个章节
    const index = {
        title: data.title,
        config: './config.json',
        rootContent: data.rootContent ? './root-content.json' : null,
        sections: {}
    };
    
    for (const sectionKey of Object.keys(data.sections)) {
        const fileName = sectionNames[sectionKey] || sectionKey.toLowerCase().replace(/[^\w]/g, '-');
        index.sections[sectionKey] = `./${fileName}.json`;
    }
    
    fs.writeFileSync(
        path.join(configDir, 'index.json'),
        JSON.stringify(index, null, 2),
        'utf-8'
    );
    console.log('✓ 保存 index.json');
    
    console.log(`\n✅ 拆分完成！`);
    console.log(`   共拆分 ${sectionCount} 个章节文件`);
    console.log(`   文件保存在: ${configDir}/`);
    
} catch (error) {
    console.error('❌ 拆分失败:', error);
    console.error(error.stack);
    process.exit(1);
}

