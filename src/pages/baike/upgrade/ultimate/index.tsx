import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./index.less";

export const Ultimate = () => {
  const navigate = useNavigate();
  const params = useParams<{ sectionId?: string; childId?: string }>();

  useEffect(() => {
    // 如果没有 leafId，重定向到第一个子页面
    if (params.sectionId === "upgrade" && params.childId === "ultimate") {
      navigate(`/baike/upgrade/ultimate/ultimate-weapon-upgrade`, { replace: true });
    }
  }, [navigate, params.sectionId, params.childId]);

  return null;
};
