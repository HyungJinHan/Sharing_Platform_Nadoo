import axios from 'axios';
import { useState } from 'react';
import { DefaultValue, selector } from 'recoil';
import detailNum from './atom/detailNum';

export default selector({
  key: 'detailNumSelector',
  get: ({ get }) => {
    // const [groupList, setGroupList] = useState({
    //   list: []
    // });

    axios
      .post('http://localhost:8088/nadoo/tradeAll', {
      })
      .then((res) => {
        const { data } = res;
        // setGroupList({
        //   list: data.tradeAll
        // });
      })
      .catch((e) => {
        console.error(e);
      })
  }
})