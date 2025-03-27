import { useTranslations } from "next-intl";

type MenuOption = {
  item: string;
  path: string;
};

export const Menu = (): MenuOption[] => {
  const t = useTranslations("Menu");

  const options: MenuOption[] = [
    { item: t("home"), path: "/" },
    { item: t("cart"), path: "/cart" },
    { item: t("orders"), path: "/orders" },
    { item: t("profile"), path: "/profile" },
    { item: t("faqs"), path: "/faqs" },
    { item: t("conditions"), path: "/conditions" },
  ];

  return options;
};

type MetadataMessages = {
  title: string;
  description: string;
  keywords: string;
};

export const getMetadata = (messages: Record<string, any>): MetadataMessages => {
  const metadataMessages = messages.Metadata as MetadataMessages;

  return {
    title: metadataMessages.title,
    description: metadataMessages.description,
    keywords: metadataMessages.keywords,
  };
};
