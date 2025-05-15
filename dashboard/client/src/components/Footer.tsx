import { InfiniteLogo } from "./ui/infinite-logo";
import { SectionWrapper } from "./ui/section-wrapper";
import logoImage from "../assets/logo.png";

type FooterLinkGroup = {
  title: string;
  links: { text: string; href: string }[];
};

const linkGroups: FooterLinkGroup[] = [
  {
    title: "Quick Links",
    links: [
      { text: "Home", href: "#" },
      { text: "About Us", href: "#" },
      { text: "Classes", href: "#" },
      { text: "Topics", href: "#" },
      { text: "Resources", href: "#" },
      { text: "FAQs", href: "#" },
      { text: "Contact", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { text: "Join a Class", href: "#" },
      { text: "Ask a Question", href: "#" },
      { text: "Practice Tests", href: "#" },
      { text: "Visual Notes", href: "#" },
      { text: "Physics Shorts", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { text: "Privacy Policy", href: "#" },
      { text: "Terms & Conditions", href: "#" },
      { text: "Careers", href: "#" },
      { text: "Blog", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <SectionWrapper as="footer" className="bg-dark pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div>
            <a href="#" className="flex items-center mb-4">
              <img src={logoImage} className="w-12 h-full" />
            </a>
            <p className="text-gray-400 text-sm mb-6">
              We simplify physics through visuals and storytelling—making learning intuitive and fun.
            </p>
          </div>
          
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-white font-bold mb-4">{group.title}</h3>
              <ul className="space-y-2 text-gray-400">
                {group.links.map((link) => (
                  <li key={link.text}>
                    <a 
                      href={link.href} 
                      className="hover:text-primary transition-colors"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Inphynitics. All rights reserved.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
