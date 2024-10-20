import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import Poll from "@/components/story-widgets/Poll";
import { forwardRef } from "react";

const ThisWebsite = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  return (
    <CardsLayout {...props} ref={ref}>
      <Card>
        <p>As you can see, this website is a clone of an Instagram profile. I reverse-engineered all the styles of the official page and adapted for achieving this amazing result.</p>
        <p className="font-bold">Features:</p>
        <ul className="ml-6 list-disc">
          <li>Fully responsive design</li>
          <li>Dark mode</li>
          <li>Scroll animations</li>
        </ul>
        <Poll
          title="Do you like it?"
          options={["Does not look professional 😪👎🏻", "I don't know 🫤", "I love it! 😍"]}
          correctAnswerIndex={2}
          messagesOnAnswerChosen={['\"Do not give dogs what is sacred\". Mathew 7:6', "Keep trying...😉", "You nailed it! 👏🏻"]}
        />
      </Card>
      <Card>
        <div className="rounded-lg bg-gray-300 dark:bg-slate-900 p-2">
          <h1 className="bg-gradient-to-r from-blue-700 dark:from-blue-500 to-green-400 dark:to-green-500 bg-clip-text text-center text-2xl font-black text-transparent">Technological stack</h1> 
        </div>
        <p>
          The website is a set of HTML, CSS and TypeScript files handled by the meta-framework{" "}
          <a className="styled-a" href="https://nextjs.org/" target="_blank">
            Next.js
          </a>. It is hosted on{" "}
          <a className="styled-a" href="https://www.vercel.com/" target="_blank">
            Vercel
          </a>
          , and the source code is available on{" "}
          <a className="styled-a" href="https://github.com/Jaime02/Portfolio" target="_blank">
            Github
          </a>
          . It has taken me a lot of effort, sweat and tears, but I think that it is worth it. I wanted to follow the best practices available and keep the number of dependencies as low as possible.
        </p>
      </Card>
    </CardsLayout>
  );
});

ThisWebsite.displayName = "This website";
export default ThisWebsite;
