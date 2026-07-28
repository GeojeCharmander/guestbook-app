import { getEntries } from "@/lib/entries";
import GuestbookForm from "./GuestbookForm";
import GuestbookList from "./GuestbookList";

export default async function Home() {
  const entries = await getEntries();

  return (
    <main className="page">
      <div className="card">
        <section className="gb-header">
          <span className="mark">✳</span>
          <h1>나의 방명록</h1>
          <p>다녀가신 분들의 마음을 여기에 남겨주세요</p>
        </section>

        <GuestbookForm />

        <div className="divider">
          <span>먼저 다녀간 분들</span>
        </div>

        <GuestbookList initialEntries={entries} />
      </div>
    </main>
  );
}
