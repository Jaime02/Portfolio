import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import Poll from "@/components/story-widgets/Poll";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { forwardRef } from "react";

const ThisWebsite = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  return (
    <CardsLayout {...props} ref={ref}>
      <Card>
        <p>As you can see, this website is a clone of an Instagram profile. I reverse-engineered all the styles of the official page and adapted for achieving this amazing result.</p>
        <p className="font-bold">Features:</p>
        <ul className="ml-6 list-disc">
          <li>
            Fully{" "}
            <Tooltip>
              <TooltipTrigger>responsive</TooltipTrigger>
              <TooltipContent>It adapts to any screen size</TooltipContent>
            </Tooltip>{" "}
            design
          </li>
          <li>Dark mode</li>
          <li>Scroll animations</li>
        </ul>
        <Poll
          title="Do you like it?"
          options={["Does not look professional 😪👎🏻", "I don't know 🫤", "I love it! 😍"]}
          correctAnswerIndex={2}
          messagesOnAnswerChosen={['"Do not give dogs what is sacred". Mathew 7:6', "Keep trying...😉", "You nailed it! 👏🏻"]}
        />
      </Card>
      <Card>
        <div className="rounded-lg bg-gray-300 p-2 dark:bg-slate-900">
          <h1 className="bg-gradient-to-r from-blue-700 to-green-400 bg-clip-text text-center text-2xl font-black text-transparent dark:from-blue-500 dark:to-green-500">Technological stack</h1>
        </div>
        <p>
          The website is just a set of HTML, CSS and TypeScript files handled by the meta-framework{" "}
          <a className="styled-a" href="https://nextjs.org/" target="_blank">
            Next.js
          </a>
          . It is hosted on{" "}
          <a className="styled-a" href="https://www.vercel.com/" target="_blank">
            Vercel
          </a>
          , and the source code is available on{" "}
          <a className="styled-a" href="https://github.com/Jaime02/Portfolio" target="_blank">
            Github
          </a>
          . I wanted to follow the best practices available and keep the number of dependencies as low as possible.
        </p>
        <p>
          The performance, accesibility and{" "}
          <Tooltip>
            <TooltipTrigger>SEO</TooltipTrigger>
            <TooltipContent>
              Search Engine Optimization
              <br />
              Determines how well a website ranks in search results
            </TooltipContent>
          </Tooltip>{" "}
          of the website is evaluated with the maximum score in{" "}
          <a target="_blank" className="styled-a" href="https://developer.chrome.com/docs/lighthouse/overview">
            Google&rsquo;s Lighthouse
          </a>
        </p>
        <video autoPlay muted loop>
          <source src="/videos/LighthouseResults.mp4" type="video/mp4" />
          Sorry, your browser does not support the video tag
        </video>
      </Card>
    </CardsLayout>
  );
});

ThisWebsite.displayName = "This website";
export default ThisWebsite;
