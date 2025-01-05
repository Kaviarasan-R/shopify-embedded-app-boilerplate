import { Spinner } from "@shopify/polaris";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ExitFrame = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const shop = new URLSearchParams(location.search).get("shop");
    const host = new URLSearchParams(location.search).get("host");
    navigate(
      `${process.env.SHOPIFY_APP_URL}/api/auth?shop=${shop}&host=${host}`
    );
  }, []);

  return <Spinner />;
};

export default ExitFrame;
