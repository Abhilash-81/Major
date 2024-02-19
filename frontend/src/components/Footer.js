import React from "react";
import { Link } from "react-router-dom";
import {
  Footer as FlowbiteFooter,
  FooterCopyright,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

const MyFooter = () => {
  return (
    <FlowbiteFooter bgDark>
      <div className="pt-4 w-full">
        <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
          <div>
            <FooterTitle title="Company" />
            <FooterLinkGroup col>
              <Link to="/about">
                <FooterLink>About</FooterLink>
              </Link>
              <FooterLink>Careers</FooterLink>
              <FooterLink>Brand Center</FooterLink>
              <FooterLink>Blog</FooterLink>
            </FooterLinkGroup>
          </div>
          <div>
            <FooterTitle title="help center" />
            <FooterLinkGroup col>
              <FooterLink>Discord Server</FooterLink>
              <Link to="https://twitter.com/JampaniAbhi81">
                <FooterLink>Twitter</FooterLink>
              </Link>
              <FooterLink>Facebook</FooterLink>
              <Link to="/contact">
                <FooterLink>Contact Us</FooterLink>
              </Link>
            </FooterLinkGroup>
          </div>
          <div>
            <FooterTitle title="legal" />
            <FooterLinkGroup col>
              <FooterLink>Privacy Policy</FooterLink>
              <FooterLink>Licensing</FooterLink>
              <FooterLink>Terms &amp; Conditions</FooterLink>
            </FooterLinkGroup>
          </div>
          <div>
            <FooterTitle title="download" />
            <FooterLinkGroup col>
              <FooterLink>iOS</FooterLink>
              <FooterLink>Android</FooterLink>
              <FooterLink>Windows</FooterLink>
              <FooterLink>MacOS</FooterLink>
            </FooterLinkGroup>
          </div>
        </div>
        <div className="w-full bg-gray-700 px-4 py-6 sm:flex sm:items-center sm:justify-between">
          <FooterCopyright by="Skill Share" year={2024} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FooterIcon icon={BsFacebook} />
            <FooterIcon icon={BsInstagram} />
            <FooterIcon icon={BsTwitter} />
            <FooterIcon icon={BsGithub} />
            <FooterIcon icon={BsDribbble} />
          </div>
        </div>
      </div>
    </FlowbiteFooter>
  );
};

export default MyFooter;
