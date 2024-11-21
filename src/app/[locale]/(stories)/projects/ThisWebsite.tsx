import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import Poll from "@/components/story-widgets/Poll";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslations } from "next-intl";
import { forwardRef } from "react";

const ThisWebsite = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  const t = useTranslations('This website');
  const tc = useTranslations('Commons');
  return (
    <CardsLayout {...props} ref={ref}>
      <Card>
        <p>{t("This website description")}</p>
        <p className="font-bold">{t("Features")}:</p>
        <ul className="ml-6 list-disc flex flex-col gap-1"> 
          <li>
            {t("Feature 1.1")}{" "}
            <Tooltip>
              <TooltipTrigger>responsive</TooltipTrigger>
              <TooltipContent>{t("It adapts to any screen size")}</TooltipContent>
            </Tooltip>{" "}
            {t("Feature 1.2")}
          </li>
          <li>{t("Dark mode")}</li>
          <li>{t("Smooth scroll animations")}</li>
          <li>{t("HTML content")}</li>
          <li>{t("Language translatations")}</li>
        </ul>
        <Poll
          title={t("Do you like it")}
          options={[t("Does not look professional") + " 😪👎🏻", t("I dont know") + " 🫤", t("I love it") + " 😍"]}
          correctAnswerIndex={2}
          messagesOnAnswerChosen={[t('Mateo 7 6'), t("Keep trying") + "...😉", t("You nailed it") + " 👏🏻"]}
        />
      </Card>
      <Card>
        <div className="rounded-lg bg-gray-300 p-2 dark:bg-slate-900">
          <h1 className="bg-gradient-to-r from-blue-700 to-green-400 bg-clip-text text-center text-2xl font-black text-transparent dark:from-blue-500 dark:to-green-500">{t("Technological stack")}</h1>
        </div>
        <p>
          {t("2.1") + " "}
          <a className="styled-a" href="https://nextjs.org/" target="_blank">
            Next.js
          </a>
          . {t("It is hosted on") + " "}
          <a className="styled-a" href="https://www.vercel.com/" target="_blank">
            Vercel
          </a>
          , {t("and the source code is available on") +" "}
          <a className="styled-a" href="https://github.com/Jaime02/Portfolio" target="_blank">
            Github
          </a>
          . {t("2.2")}
        </p>
        <p>
          {t("2.3") + " "}
          <Tooltip>
            <TooltipTrigger>SEO</TooltipTrigger>
            <TooltipContent>
              Search Engine Optimization
              <br />
              {t("2.4")}
            </TooltipContent>
          </Tooltip>{" "}
          {t("2.5") + " "}
          <a target="_blank" className="styled-a" href="https://developer.chrome.com/docs/lighthouse/overview">
            Google&rsquo;s Lighthouse
          </a>
        </p>
        <video autoPlay muted loop>
          <source src="/videos/LighthouseResults.mp4" type="video/mp4" />
          {tc("No video tag support")}
        </video>
      </Card>
    </CardsLayout>
  );
});

ThisWebsite.displayName = "This website";
export default ThisWebsite;
