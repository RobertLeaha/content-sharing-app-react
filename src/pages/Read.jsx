import { useParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import { useState } from "react";

const bookContent = {
  "În numele trandafirului": {
    title: "În numele trandafirului",
    author: "Umberto Eco",
    chapters: [
      {
        title: "Capitolul 1 - Prima zi",
        content: `În care se ajunge la poalele mănăstirii și William dă dovadă de mare înțelepciune.

Era o dimineață frumoasă de sfârșitul lunii noiembrie. În timpul nopții căzuse puțină zăpadă, dar nu mai mult de trei degete. În întunericul de dinaintea zorilor, în timp ce urcam pe cărarea care se înfășura în jurul muntelui, nu puteam vedea decât câteva urme de animale sălbatice pe zăpada proaspătă. Dar când soarele a început să răsară, am putut admira spectacolul minunat al mănăstirii.

Mănăstirea se înălța pe un platou care domina văile de jur împrejur, și de la distanță părea o cetate, cu zidurile sale înalte și turnurile masive. Pe măsură ce ne apropiam, am putut distinge mai bine arhitectura complexă a clădirilor, dispuse în jurul unei curți centrale.

Maestrul meu, William de Baskerville, se opri pentru a contempla peisajul. Era un om înalt și slab, cu ochii ascuțiți și pătrunzători, care părea să vadă lucruri pe care alții nu le observau. În acea dimineață, privirea lui era concentrată asupra unor urme din zăpadă.

"Adso," îmi spuse, "vezi aceste urme? Aparțin unui cal negru, de cinci ani, foarte frumos, cu coada lungă, cu copitele mici și rotunde, dar cu galop foarte regulat. Capul îi este mic, urechile ascuțite, ochii mari. A trecut pe aici acum cel mult o jumătate de oră. A mers în direcția mănăstirii, și cred că îl vom găsi acolo."

Eram uimit de aceste deducții, dar nu am avut timp să-l întreb cum ajunsese la aceste concluzii, pentru că în acel moment am văzut venind spre noi un grup de călugări, care păreau foarte agitați.`,
      },
      {
        title: "Capitolul 2 - În care se întâlnesc personaje importante",
        content: `Călugării care veneau spre noi erau conduși de un bărbat în vârstă, cu barba albă și privirea severă. Era abatele mănăstirii, Abbone din Fossanova, un om respectat pentru înțelepciunea și autoritatea sa.

"Sunteți William de Baskerville?" întrebă abatele, privind cu atenție la maestrul meu.

"Da, părinte abate. Și acesta este discipulul meu, Adso din Melk. Am venit la chemarea voastră pentru a participa la disputele teologice care vor avea loc aici."

Abatele păru ușurat. "Slavă Domnului că ați ajuns în siguranță. Dar îmi pare rău să vă spun că situația de aici s-a complicat foarte mult. În această dimineață am descoperit că unul dintre frații noștri, Adelmo din Otranto, a murit în împrejurări misterioase."

William își încruntă sprâncenele. "Misterioase în ce fel?"

"Corpul său a fost găsit la baza turnului, zdrobit de cădere. Dar nimeni nu înțelege cum a ajuns acolo. Adelmo era un tânăr plin de viață, un miniaturist talentat, care lucra în scriptoriul nostru. Nu avea niciun motiv să se sinucidă."

În timp ce abatele vorbea, am observat că alți călugări se adunaseră în jurul nostru, ascultând cu atenție. Printre ei am remarcat un bărbat tânăr, cu privirea inteligentă și mâinile pătate de cerneală - probabil un alt copist din scriptoriul.

"Părinte abate," spuse William, "dacă îmi permiteți, aș dori să examinez locul unde a fost găsit corpul. Poate că voi putea să văd lucruri care au scăpat altora."

Abatele ezită un moment. "Bineînțeles, frate William. Dar să știți că această tragedie vine într-un moment foarte nepotrivit. Mâine vor sosi aici reprezentanții papei și ai împăratului pentru negocierile despre care v-am scris. Această moarte misterioasă ar putea să complice foarte mult lucrurile."

Am înțeles atunci că ne aflam în mijlocul unor evenimente care depășeau cu mult o simplă tragedie locală. Mănăstirea devenise teatrul unor intrigi politice și religioase de mare importanță, iar moartea lui Adelmo ar putea fi doar începutul unei serii de evenimente tulburi.`,
      },
    ],
  },
};

export default function ReadPage() {
  const { title } = useParams();
  const decodedTitle = decodeURIComponent(title);
  const book = bookContent[decodedTitle];
  const [currentChapter, setCurrentChapter] = useState(0);

  if (!book) {
    return (
      <div className="min-h-screen bg-sky-100">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-sky-900">
            Cartea nu a fost găsită
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-100">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-sky-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="mr-3">📖</span>
                <div>
                  <h1 className="text-2xl font-bold">{book.title}</h1>
                  <p className="text-sky-100">de {book.author}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sky-100">
                  Capitol {currentChapter + 1} din {book.chapters.length}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="bg-sky-50 px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <button
                onClick={() =>
                  setCurrentChapter(Math.max(0, currentChapter - 1))
                }
                disabled={currentChapter === 0}
                className="flex items-center px-4 py-2 text-sky-600 hover:text-sky-800 disabled:text-sky-300 disabled:cursor-not-allowed transition-colors"
              >
                <span className="mr-1">←</span>
                Capitol anterior
              </button>

              <h2 className="text-lg font-semibold text-sky-800">
                {book.chapters[currentChapter].title}
              </h2>

              <button
                onClick={() =>
                  setCurrentChapter(
                    Math.min(book.chapters.length - 1, currentChapter + 1)
                  )
                }
                disabled={currentChapter === book.chapters.length - 1}
                className="flex items-center px-4 py-2 text-sky-600 hover:text-sky-800 disabled:text-sky-300 disabled:cursor-not-allowed transition-colors"
              >
                Capitol următor
                <span className="ml-1">→</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="prose prose-lg max-w-none">
              <div className="text-sky-900 leading-relaxed whitespace-pre-line">
                {book.chapters[currentChapter].content}
              </div>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="bg-sky-50 px-6 py-4 border-t">
            <div className="flex justify-between">
              <button
                onClick={() =>
                  setCurrentChapter(Math.max(0, currentChapter - 1))
                }
                disabled={currentChapter === 0}
                className="flex items-center px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:bg-sky-300 disabled:cursor-not-allowed transition-colors"
              >
                <span className="mr-2">←</span>
                Anterior
              </button>

              <button
                onClick={() =>
                  setCurrentChapter(
                    Math.min(book.chapters.length - 1, currentChapter + 1)
                  )
                }
                disabled={currentChapter === book.chapters.length - 1}
                className="flex items-center px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:bg-sky-300 disabled:cursor-not-allowed transition-colors"
              >
                Următor
                <span className="ml-2">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
          
    </div>
  );
}
