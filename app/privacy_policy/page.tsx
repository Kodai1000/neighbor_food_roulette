export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 text-gray-800 bg-white m-4">
      <h1 className="mb-8 text-3xl font-bold">プライバシーポリシー</h1>

      <p className="mb-8 leading-7">
        「近くの外食ルーレット」（以下、「当サイト」といいます。）では、
        利用者の情報を適切に取り扱うため、以下のとおりプライバシーポリシーを定めます。
      </p>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">1. 取得する情報</h2>
        <p className="mb-3 leading-7">
          当サイトでは、サービスの提供にあたり、以下の情報を取得する場合があります。
        </p>
        <ul className="list-disc space-y-2 pl-6 leading-7">
          <li>
            <strong>位置情報：</strong>
            利用者が飲食店検索を行う際、ブラウザの位置情報機能を通じて取得する現在地の情報。
          </li>
          <li>
            <strong>アクセス情報：</strong>
            ページの閲覧状況、閲覧日時、参照元、地域情報、ブラウザや端末の種類などの情報。
            詳細については、{" "}
            <a
                href="https://vercel.com/docs/analytics/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline underline-offset-2"
            >
                Vercelのプライバシーに関する説明
            </a>
            をご確認ください。
          </li>
          <li>
            <strong>その他の情報：</strong>
            サービスの利用に伴い、サーバーや外部サービスを通じて自動的に送信される情報。
            ユーザーが入力した予算や店舗の検索範囲に関する情報
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">2. 情報の利用目的</h2>
        <p className="mb-3 leading-7">取得した情報は、以下の目的で利用します。</p>
        <ul className="list-disc space-y-2 pl-6 leading-7">
          <li>利用者の現在地に基づいた飲食店の検索結果を提供するため。</li>
          <li>当サイトの利用状況を把握し、サービスの改善や機能の向上に役立てるため。</li>
          <li>サービスの安定的な運営および不正利用への対応のため。</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">3. 位置情報の取り扱い</h2>
        <p className="mb-3 leading-7">
          当サイトでは、飲食店検索機能を提供するため、利用者が検索操作を行った際に、
          ブラウザを通じて位置情報を取得します。
        </p>
        <p className="mb-3 leading-7">
          取得した位置情報は、飲食店を検索するために外部API（ホットペッパーグルメサーチAPI）に送信されます。
        </p>
        <p className="mb-3 leading-7">
          当サイトの運営者は、取得した位置情報や検索履歴を自らのデータベースに
          継続的に保存することはありません。
        </p>
        <p className="leading-7">
          なお、位置情報の取得はブラウザの設定によって許可・拒否することができます。
          位置情報の提供を拒否した場合、エラーが発生し、ルーレットを回すことができません。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">4. 外部サービスの利用</h2>

        <h3 className="mb-2 text-lg font-semibold">飲食店検索API</h3>
        <p className="mb-3 leading-7">
          当サイトでは、株式会社リクルートが提供する「ホットペッパーグルメサーチAPI」を利用しています。
        </p>
        <p className="mb-6 leading-7">
          飲食店情報の検索にあたり、検索に必要な情報(位置情報、入力した予算、店舗の検索範囲など)が同社のサービスに送信されます。
          送信された情報の取り扱いについては、各サービス提供者のプライバシーポリシー等をご確認ください。
        </p>

        <h3 className="mb-2 text-lg font-semibold">アクセス解析ツール</h3>
        <p className="mb-3 leading-7">
          当サイトでは、サービスの利用状況の把握および改善を目的として、
          Vercel, Inc. が提供する「Vercel Web Analytics」を利用しています。
        </p>
        <p className="mb-3 leading-7">
          本サービスでは、ページの閲覧状況、閲覧日時、参照元、地域情報、
          ブラウザや端末の種類などの情報を収集・分析します。
        </p>
        <p className="leading-7">
          詳細については、{" "}
          <a
            href="https://vercel.com/docs/analytics/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline underline-offset-2"
          >
            Vercelのプライバシーに関する説明
          </a>
          をご確認ください。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">5. 情報の保存・管理</h2>
        <p className="mb-3 leading-7">
          当サイトでは、利用者のアカウント登録やデータベースによる個人情報・検索履歴の管理を行っていません。
        </p>
        <p className="leading-7">
          ただし、当サイトのホスティングサービスや外部API提供者において、
          サービスの提供・保守等に必要な情報が記録・保存される場合があります。
          これらの情報は、各サービス提供者の定める方針に従って取り扱われます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">6. 第三者への情報提供</h2>
        <p className="leading-7">
          当サイトでは、法令に基づく場合を除き、取得した情報を運営者が独自に第三者へ提供することはありません。
          ただし、飲食店検索やアクセス解析など、サービスの提供に必要な範囲で外部サービスに情報を送信する場合があります。
          これらについては、本ポリシーの「4. 外部サービスの利用」に記載しています。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">7. プライバシーポリシーの変更</h2>
        <p className="leading-7">
          当サイトは、法令の改正やサービス内容の変更等に応じて、本ポリシーを変更することがあります。
          変更後のプライバシーポリシーは、当サイト上に掲載した時点から適用されるものとします。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">8. お問い合わせ</h2>
        <p className="mb-3 leading-7">
          当サイトの情報の取り扱いに関するお問い合わせは、フッターの管理者Xリンクからお願いいたします。
        </p>
      </section>

      <p className="mt-10 text-sm text-gray-500">制定日：2026年11月1日</p>
    </main>
  );
}
