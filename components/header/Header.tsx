import { getSession } from "@auth0/nextjs-auth0";
import LanguageSelector from "@/components/LanguageSelector";
import { getDictionary } from "@/app/[lang]/dictionaries";

const Header = async ({ lang }: { lang: string }) => {
  const session = await getSession();
  const dictionary = await getDictionary(lang);

  return (
    <div>
      Header <br />
      <br />
      <LanguageSelector dictionary={dictionary} /> <br />
      <br />
      <a href="/api/auth/login">Login</a> |{" "}
      <a href="/api/auth/logout">Logout</a>
      {session && (
        <div>
          <img src={session.user.picture} alt={session.user.name} />
          <h2>{session.user.name}</h2>
          <p>{session.user.email}</p>
        </div>
      )}
    </div>
  );
};

export default Header;
