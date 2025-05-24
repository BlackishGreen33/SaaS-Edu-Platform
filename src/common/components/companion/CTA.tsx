import Image from 'next/image';
import Link from 'next/link';

const Cta: React.FC = () => (
  <section className="bg-cta flex w-1/3 flex-col items-center gap-5 rounded-4xl px-7 py-10 text-center text-white max-lg:w-1/2 max-md:w-full">
    <div className="bg-cta-gold rounded-4xl px-3 py-1.5 text-black">
      开始以自己的方式学习
    </div>
    <h2 className="text-3xl font-bold">构建和个性化学习伙伴</h2>
    <p>选择一个名字，科目，声音，和个性，开始通过自然和有趣的语音对话学习。</p>
    <Image src="images/cta.svg" alt="cta" width={362} height={232} />
    <button className="btn-primary">
      <Image src="/icons/plus.svg" alt="plus" width={12} height={12} />
      <Link href="/companions/new">
        <p>构建新伙伴</p>
      </Link>
    </button>
  </section>
);

export default Cta;
