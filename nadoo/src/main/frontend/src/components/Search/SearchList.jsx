import axios from 'axios';
import React, { useEffect, useState } from 'react';

function SearchList({
  productList
}) {

  return (
    <div>
      <input
        value={'SearchList Button'}
        type="button"
        onClick={
          () => {
            productList();
          }
        }
      />
    </div>
  );
}



export default SearchList;