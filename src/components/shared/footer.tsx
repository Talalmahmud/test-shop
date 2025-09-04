import Image from "next/image";
import Link from "next/link";

type Category = {
  id: number;
  name: string;
  thumbnail?: string;
  slug?: string;
  categories: {
    id: number;
    name: string;
    categories: {
      id: number;
      name: string;
    }[];
  }[];
};
const Footer = async () => {
  const categoryData = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/categories/navigation`
  ).then((res) => res.json());

  const processData = categoryData.map((item: Category) => ({
    id: item.id,
    name: item.name,
    thumbnail: item.thumbnail,
    slug: item.slug,
  }));

  // group items into rows of max 4

  return (
    <footer className="bg-black text-white pt-12 pb-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Footer links */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div className="mb-6">
                <h3 className="font-semibold text-sm mb-4 uppercase tracking-wider">
                  Shop By Category
                </h3>
                <ul className="space-y-2">
                  {processData.map(
                    (link: { name: string; slug: string; id: number }) => (
                      <li key={link.id}>
                        <Link
                          href={`/search?category_slug=${link.slug}`}
                          className="text-sm text-gray-300 hover:text-white transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="mb-6">
                <h3 className="font-semibold text-sm mb-4 uppercase tracking-wider">
                  About Us
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href={`/return`}
                      className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      Return
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/tnc`}
                      className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      Term Conditions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/faq`}
                      className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/return`}
                      className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      Our Story
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mb-6">
                <h3 className="font-semibold text-sm mb-4 uppercase tracking-wider">
                  Contact Us
                </h3>
                <ul className="space-y-2">
                  <li className="text-sm text-gray-300 hover:text-white transition-colors">
                    01786633874
                  </li>
                  <li className="text-sm text-gray-300 hover:text-white transition-colors">
                    elevatedhkbd@gmail.com
                  </li>
                </ul>
              </div>
              <div className="mb-6">
                <h3 className="font-semibold text-sm mb-4 uppercase tracking-wider">
                  Shop with us
                </h3>
                <Image
                  src={"/bkash.svg"}
                  alt="bkash"
                  height={80}
                  width={100}
                  className=" bg-white"
                />
              </div>
              {/* {footerSections.map((section, index) => (
                <div key={index} className="mb-6">
                  <h3 className="font-semibold text-sm mb-4 uppercase tracking-wider">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href="#"
                          className="text-sm text-gray-300 hover:text-white transition-colors"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))} */}
            </div>
          </div>

          {/* Newsletter signup */}
          <div>
            <h3 className="font-semibold text-sm mb-4 uppercase tracking-wider">
              STAY CONNECTED
            </h3>
            <p className="text-gray-300 text-sm mb-4 ">
              Get 15% off your first order and updates on our latest product
              launches—straight to your inbox.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6"></div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400 text-sm">
            © 2025 All Rights Reserved Elevated BD™
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="#" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            {/* <span>•</span>
            <a href="#" className="hover:text-white transition-colors">
              Giveaway Details
            </a> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
