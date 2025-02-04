import React from 'react';
import style from '../../Styles/item.module.css'
import ItemPageSection1 from '@/app/Components/ItemPageComponents/ItemPageSection1';

export default function Page() {
  return (
    <div className={style.item_page}>
      <ItemPageSection1/>
    </div>
  )
}
