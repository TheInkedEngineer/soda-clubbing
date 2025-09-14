import { Title } from '../src/components/title';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="pb-20">
      <Title text="Page Not Found" />
      <div className="w-full flex items-center justify-center">
        <Image src="/remote-images/404.jpeg" alt="Not found" width={768} height={768} className="max-w-md w-full h-auto" />
      </div>
    </div>
  );
}
