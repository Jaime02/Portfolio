import GithubIcon from "@/icons/GithubIcon";

export default function GithubRepoLink({ href }: { href: string }) {
  return (
  <a className="styled-a flex items-center justify-center gap-1 text-center" href={href} target="_blank">
  <GithubIcon extraClasses="size-5"/> 
  Source code
</a>
  );
}