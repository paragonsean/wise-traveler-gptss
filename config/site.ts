export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "supabase",
  url: "https://localhost:3000",
  ogImage: "https://chef-genie.app/og.png",
  description: "An open-source Travel Planner powered by OpenAi and ChatGPT.",
  mainNav: [
    {
      title: "Wise Traveler Homepage",
      href: "/",
    },
  ],
  links: {
  
    github: "https://github.com/paragonsean",
    docs: "https://localhost:3000",
  },
}
