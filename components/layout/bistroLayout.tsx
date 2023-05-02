import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import WithAuth from "~/hoc/withAuth";
import { RouterOutputs, api } from "~/utils/api";
import { links } from "~/utils/links";

type dataType = RouterOutputs["bistroUser"]["getAll"][number];
const bistroContext = createContext<dataType>();

export const useBistro = () => {
  const bistro = useContext(bistroContext);
  return bistro;
};

const BistroLayout = <P extends Object>(Component: React.ComponentType<P>) => {
  /**
   * TODO:
   * check user is a member of Bistro
   *
   * True: pass down bistroUser as prop
   * False: redirect to Bistro select page
   */
  // const z = useContext()
  // const bistroIdCont
  const Wrap = (props: P) => {
    const router = useRouter();
    const { isReady, query } = router;
    console.log("in bistroLayout", query, isReady);
    const { data, isFetched } = api.bistroUser.getAll.useQuery();

    const [bistro, setBistro] = useState<dataType>();

    useEffect(() => {
      if (data) {
        setBistro(data.find((e) => e.bistroId === query.bistroId));
      }
    }, [data]);

    const getBistroUser = (data: dataType[]) => {
      const temp = data.find((e) => e.bistroId === query.bistroId);
      // setBistro(temp);
      return temp;
    };

    if (isReady && isFetched && data) {
      if (!getBistroUser(data)) {
        router.push({ pathname: links.bistro });
      }
    }
    // useEffect(() => {
    // }, [isReady]);

    return isReady && bistro ? (
      <>
        BistroLayout
        <NavigationMenuDemo />
        <bistroContext.Provider value={bistro}>
          <Component {...{ ...props }} />
        </bistroContext.Provider>
      </>
    ) : null;
  };

  return Wrap;
};

// http://localhost:3000/bistro/clh35xx6l0001wm8sm1rjg3jz/home
export default (c: React.ComponentType) => WithAuth(BistroLayout(c));

("use client");

import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
// import { Icons } from "@/components/icons";
import { cn } from "../lib/utils";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    {/* <Icons.logo className="h-6 w-6" /> */}
                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Radix UI and
                      Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
