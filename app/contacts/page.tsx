"use client";
import { Title } from '@/components/title';
import { Footer } from '../components/Footer';

export default function ContactsPage() {
  return (
    <div>
      <Title text="Get in touch" />
      <p className="my-8">
        <span className="font-bold text-xl md:text-2xl">Email:</span>
        <br />
        <br />
        <a
          href="mailto:info@soda-party.com"
          className="title text-xl md:text-3xl underline"
        >
          info@soda-party.com
        </a>
      </p>
      <p className="mb-48 sm:mb-96">
        <span className="font-bold text-xl md:text-2xl">Instagram:</span>
        <br />
        <br />
        <a
          href="https://www.instagram.com/soda.clubbing"
          target="_blank"
          rel="noopener noreferrer"
          className="title text-xl md:text-3xl underline"
        >
          @soda.clubbing
        </a>
      </p>
      <Footer />
    </div>
  );
}
