import Combobox from '@/components/ui/combobox';

import { Dictionary } from '@/types';

const getDictionary = async (): Promise<Dictionary> => {
  const data = await fetch(
    'https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt',
    { cache: 'no-store' }
  );
  const text = await data.text();
  const words = text.split('\r\n');
  words.pop();
  return words;
};

const Home: React.FC = async () => {
  const dictionary = await getDictionary();

  return (
    <section className='h-full justify-center grid gap-6'>
      <h1 className='text-xl'>Custom Virtualized List</h1>
      <Combobox data={dictionary} />
    </section>
  );
};

export default Home;
