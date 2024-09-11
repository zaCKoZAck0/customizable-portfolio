import { CopyableText } from '~/components/typography';
import { getRelativeDate } from '~/lib/date';
import { LocalTime } from './local-time';

export function AboutMe() {
  return (
    <section>
      <div>
        <table className="text-xs md:text-lg">
          <tbody>
            <tr>
              <td className="text-muted-foreground md:pr-4">Name:</td>
              <td className="font-semibold">Ayush Kumar Yadav</td>
            </tr>
            <tr>
              <td className="text-muted-foreground md:pr-4">Age:</td>
              <td className="font-semibold">{getRelativeDate(new Date('2001-11-30'))}</td>
            </tr>
            <tr>
              <td className="text-muted-foreground md:pr-4">Nationality:</td>
              <td className="font-semibold">Indian 🇮🇳</td>
            </tr>
            <tr>
              <td className="text-muted-foreground md:pr-4">Timezone:</td>
              <LocalTime />
            </tr>
            <tr>
              <td className="text-muted-foreground md:pr-4">Languages:</td>
              <td className="font-semibold">Hindi, English</td>
            </tr>
            <tr>
              <td className="text-muted-foreground md:pr-4">Email:</td>
              <td className="font-semibold">
                <CopyableText>id.ayushkryadav@gmail.com</CopyableText>
              </td>
            </tr>
            <tr>
              <td className="text-muted-foreground md:pr-4">Phone Number:</td>
              <td className="font-semibold">
                <CopyableText>+91 9198517250</CopyableText>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
