"use client";
import { Title } from '@/components/title';
import { Footer } from '../components/Footer';
import LinkBlock from '../components/LinkBlock';

export default function ContactsPage() {
  return (
    <div>
      <Title text="Get in touch" />
      <p className="my-8">
        <span className="font-bold text-xl md:text-2xl">Email:</span>
        <br />
        <br />
        <LinkBlock href="mailto:info@soda-party.com">info@soda-party.com</LinkBlock>
      </p>
      <p className="mb-48 sm:mb-96">
        <span className="font-bold text-xl md:text-2xl">Instagram:</span>
        <br />
        <br />
        <LinkBlock href="https://www.instagram.com/soda.clubbing">@soda.clubbing</LinkBlock>
      </p>
      <Footer />
    </div>
  );
}
