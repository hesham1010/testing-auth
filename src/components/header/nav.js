"use client";
import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  DropdownSection,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownItem,
  DropdownMenu,
} from "@nextui-org/react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
export default function NavComponent() {
  const { data: session } = useSession(authoptions);
  const logoutUser = () => {
    signOut({
      callbackUrl: "/",
    });
  };
  return (
    <Navbar
      shouldHideOnScroll
      isBordered
      className="bg-gray-900 border-b-4 border-slate-400"
    >
      <NavbarBrand>
        <Link href={"/"} className="text-inherit antonFont text-2xl text-white">
          EventO
        </Link>
      </NavbarBrand>
      <NavbarContent as="div" justify="end">
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered" className="text-white">
              Menu
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="User actions" variant="flat">
            <DropdownSection>
              {!session ? (
                <DropdownItem key={"register"} textValue="register">
                  <Link href={"/register"}> Register</Link>
                </DropdownItem>
              ) : (
                <DropdownItem
                  key={"logout"}
                  textValue="log out"
                  onClick={logoutUser}
                >
                  Log out
                </DropdownItem>
              )}
            </DropdownSection>
            {session ? (
              <DropdownSection title="Admin action">
                <DropdownItem key={"dashboard"} textValue="dashboard">
                  <Link href={"/dashboard"}>Dashboard</Link>
                </DropdownItem>
                <DropdownItem key={"add events"} textValue="Add events">
                  <Link href={"/dashboard/addevent"}>Add events</Link>
                </DropdownItem>
                <DropdownItem key={"add venue"} textValue="Add Venue">
                  <Link href={"/dashboard/addvenue"}>Add Venue</Link>
                </DropdownItem>
              </DropdownSection>
            ) : null}
            {/* <DropdownItem key={"posts"} textValue="posts">
              <Link href={"/posts"}>Posts</Link>
            </DropdownItem> */}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
