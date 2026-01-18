import { title } from "process";

export const footerlabels: { label: string; herf: string }[] = [
  { label: "Terms", herf: "#" },
  { label: "Disclosures", herf: "#" },
  { label: "Disclosures", herf: "#" },
  { label: "Latest News", herf: "#" },
];

export const portfolioData: { image: string; title: string }[] = [
  {
    image: "/images/portfolio/icon-wallet.svg",
    title: "نضع أهدافك أولاً",
  },
  {
    image: "/images/portfolio/icon-vault.svg",
    title: " ندعمك باستراتيجيات مفهومة",
  },
  {
    image: "/images/portfolio/icon-mobileapp.svg",
    title: " نقدم نتائج قابلة للقياس",
  },
];

export const upgradeData: { title: string }[] = [
  { title: "تنفيذ سريع" },
  { title: "توصيات من خبراء" },
  { title: "دعم احترافي مستمر" },
  { title: "انطلق بثقة نحو أسواق المال." },
];

export const perksData: {
  icon: string;
  title: string;
  text: string;
  space: string;
}[] = [
    {
      icon: "/images/perks/icon-support.svg",
      title: "عنوان",
      text: "يمكن إضافة أي نص",
      space: "lg:mt-8",
    },
    {
      icon: "/images/perks/icon-community.svg",
      title: "عنوان",
      text: "يمكن إضافة أي نص",
      space: "lg:mt-14",
    },
    {
      icon: "/images/perks/icon-academy.svg",
      title: "عنوان",
      text: "يمكن إضافة أي نص",
      space: "lg:mt-4",
    },
  ];

export const timelineData: {
  icon: string;
  title: string;
  text: string;
  position: string;
}[] = [
    {
      icon: "/images/timeline/icon-planning.svg",
      title: "الأمان",
      text: " حسابات بإيميلك وموثقة بجواز سفرك السوري",
      position: "md:top-0 md:left-0",
    },
    {
      icon: "/images/timeline/icon-refinement.svg",
      title: "توصيات",
      text: "نقدم توصيات واستشارات حصرية من خبراء المجال",
      position: "md:top-0 md:right-0",
    },
    {
      icon: "/images/timeline/icon-prototype.svg",
      title: "سحب وإيداع",
      text: "اسحب أو أودع أموالك معنا بأي طريقة تناسبك",
      position: "md:bottom-0 md:left-0",
    },
    {
      icon: "/images/timeline/icon-support.svg",
      title: "خدمة عملاء",
      text: "متواجدين معكم دائما للمساعدة في كل الأوقات",
      position: "md:bottom-0 md:right-0",
    },
  ];

export const CryptoData: { name: string; price: number }[] = [
  { name: "Bitcoin BTC/USD", price: 67646.84 },
  { name: "Ethereum ETH/USD", price: 2515.93 },
  { name: "Bitcoin Cash BTC/USD", price: 366.96 },
  { name: "Litecoin LTC/USD", price: 61504.54 },
];
