import * as React from 'react';
import { Link } from '@inertiajs/react';



const Nav = ({ timeLimit, modal }) => {


  return (
    <div class="border-solid border border-black bg-white flex justify-between py-5">
      <div class="flex">
        <div class="px-8">アップル梅田</div>
        <div class="px-8">タイピング</div>
        {modal && <div class="px-8">{timeLimit ? `${Math.floor(timeLimit / 60)}分${timeLimit % 60}秒モード` : "無制限モード"}</div>}
      </div>
      <div class="flex">
        <Link
          class="px-8"
          href={route('questions.create')}
        >
          問題管理
        </Link>
        <Link href={route('logout')} class="px-8" method="post" as="button">
          Log Out
        </Link>
      </div>
    </div>
  );
};

export default Nav;