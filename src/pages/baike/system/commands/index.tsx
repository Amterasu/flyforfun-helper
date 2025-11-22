import React, { useState } from "react";
import { CopyOutlined, CheckOutlined } from "@ant-design/icons";
import "./index.less";

const commandsData = [
  {
    name: "/lockedslots",
    shortName: "",
    des: "显示提供背包位置的未完成任务和成就列表",
  },
  { name: "/say", shortName: "", des: "向其他玩家发送私人消息" },
  { name: "/spectate", shortName: "", des: "观战另一名玩家" },
  { name: "/addfriend", shortName: "/af", des: "邀请玩家加入你的好友列表" },
  { name: "/commands", shortName: "/h", des: "显示指令列表" },
  { name: "/connectagree", shortName: "/cag", des: "启用好友登录通知" },
  { name: "/connectrefuse", shortName: "/cre", des: "禁用好友登录通知" },
  { name: "/guildchat", shortName: "/g", des: "向公会成员发送消息" },
  { name: "/guildinvite", shortName: "/gi", des: "邀请玩家加入你的公会" },
  { name: "/ignore", shortName: "/ig", des: "忽略一名玩家" },
  { name: "/ignorelist", shortName: "/igl", des: "显示被忽略的玩家列表" },
  { name: "/messengeragree", shortName: "/mag", des: "启用好友邀请" },
  { name: "/messengerrefuse", shortName: "/mre", des: "禁用好友邀请" },
  { name: "/partychat", shortName: "/p", des: "向队伍成员发送消息" },
  { name: "/partyinvite", shortName: "/pi", des: "邀请玩家加入你的队伍" },
  { name: "/position", shortName: "/pos", des: "显示你的当前位置" },
  { name: "/shout", shortName: "/s", des: "向你周围大喊消息" },
  { name: "/shoutagree", shortName: "/ha", des: "启用大喊消息" },
  { name: "/shoutrefuse", shortName: "/hr", des: "禁用大喊消息" },
  { name: "/stageagree", shortName: "/gag", des: "启用队伍邀请" },
  { name: "/stagerefuse", shortName: "/gre", des: "禁用队伍邀请" },
  { name: "/teamchat", shortName: "/t", des: "向团队成员发送消息" },
  { name: "/time", shortName: "/ti", des: "显示本地和服务器时间" },
  { name: "/trade", shortName: "/tr", des: "请求玩家进行交易" },
  { name: "/tradeagree", shortName: "/tag", des: "启用交易" },
  { name: "/traderefuse", shortName: "/tre", des: "禁用交易" },
  { name: "/unignore", shortName: "/uig", des: "取消忽略一名玩家" },
  { name: "/whisper", shortName: "/w", des: "向其他玩家发送悄悄话消息" },
  { name: "/whisperagree", shortName: "/wag", des: "启用私人消息" },
  { name: "/whisperrefuse", shortName: "/wre", des: "禁用私人消息" },
];
export const Commands = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (command: string, index: number) => {
    try {
      await navigator.clipboard.writeText(command);
      setCopiedIndex(index);
      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    } catch (err) {
      console.error("复制失败:", err);
    }
  };

  return (
    <div className="baike-content">
      <div className="commands-table-wrapper">
        <table className="baike-table commands-table">
          <thead>
            <tr>
              <th>指令</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            {commandsData.map((command, index) => {
              const displayCommand = command.shortName || command.name;
              return (
                <tr key={index}>
                  <td 
                    className="command-name clickable"
                    onClick={() => handleCopy(displayCommand, index)}
                    title={`点击复制 ${displayCommand}`}
                  >
                    <span className="command-full">{command.name}</span>
                    {command.shortName && (
                      <span className="command-short"> ({command.shortName})</span>
                    )}
                    <span className="copy-icon-wrapper">
                      {copiedIndex === index ? (
                        <CheckOutlined className="copy-icon copied" />
                      ) : (
                        <CopyOutlined className="copy-icon" />
                      )}
                    </span>
                  </td>
                  <td>{command.des}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
