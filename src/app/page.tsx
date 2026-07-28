import { getEntries } from "@/lib/entries";
import GuestbookForm from "./GuestbookForm";

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getMonth() + 1}.${d.getDate()}`;
}

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

        {entries.length === 0 ? (
          <p className="empty">아직 남긴 메시지가 없어요. 첫 인사를 남겨보세요!</p>
        ) : (
          <ul className="gb-list">
            {entries.map((entry) => (
              <li key={entry.id}>
                <span className="avatar">{entry.name.charAt(0)}</span>
                <div className="entry">
                  <div className="row-top">
                    <b>{entry.name}</b>
                    <time>{formatDate(entry.createdAt)}</time>
                  </div>
                  <p>{entry.message}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
