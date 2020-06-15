const getSolution = (n, callback) => {
  class LIFOCache {
    // LIFOCache class

    constructor() {
      //initialize
      this.cache_data = {};
      this.key_list = [];
      this.result = [];
    }
    /*
        get(key){
            // Get an item by key
            return this.cache_data[key] || None
        }
    */
    pop_lifo() {
      // Pop item LIFO

      const x = this.key_list.pop();
      const y = this.cache_data[x];
      delete this.cache_data[x];
      const dic = {};
      dic[x] = y;
      return dic;
    }

    put(key, item) {
      // Add an item in the cache according LIFO Algorithm
      /*
            if (!key || !item) {
                return false
            }
            */
      if (this.key_list.includes(key)) {
        const i = this.key_list.indexOf(key);
        this.key_list.splice(i, 1);
      }
      this.cache_data[key] = item;
      this.key_list.push(key);
    }
  }

  board_cache = new LIFOCache();

  const result = calCulation(n);

  callback(result);

  function calCulation(n) {
    const board = [];

    for (let i = 0; i < n; i++) {
      board[i] = [];
      for (let j = 0; j < n; j++) {
        board[i][j] = 0;
      }
    }

    save_to_cache(board, n, 0);

    while (this.board_cache.key_list.length) {
      pop_from_cache(n);
    }

    return this.board_cache.result;
  }

  function save_to_cache(board, n, col) {
    // save each prosible solution to cache

    for (let i = 0; i < n; i++) {
      if (isSafe(board, n, i, col)) {
        board[i][col] = 1;
        if (col == n - 1) {
          save_result(board, n);
          return false;
        } else {
          key = `${i}x${col}`;
          console.log(key)
          const newArray = JSON.parse(JSON.stringify(board));
          //const newArray = Object.assign([], board)
          this.board_cache.put(key, newArray);
          board[i][col] = 0;
        }
      }
    }
  }

  function save_result(board, n) {
    const solution = [];
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (board[i][j] === 1) {
          a = [i, j];
          const b = JSON.parse(JSON.stringify(a));
          //const b = Object.assign([], a)
          solution.push(b);
        }
      }
    }
    const c = JSON.parse(JSON.stringify(solution));
    //const c = Object.assign([], solution)
    this.board_cache.result.push(c);
  }

  function isSafe(board, n, row, col) {
    // A function to check if a queen can be place on board[row][col]

    // check the row on left side
    for (let j = 0; j < col; j++) {
      if (board[row][j] === 1) {
        return false;
      }
    }

    // check lower diagonal on left side
    for (let i = row; i < n; i++) {
      for (let j = 0; j < col; j++) {
        if (i + j === row + col && board[i][j] === 1) {
          return false;
        }
      }
    }

    // check upper diagonal on left side
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        if (i - j === row - col && board[i][j] === 1) {
          return false;
        }
      }
    }
    return true;
  }

  function pop_from_cache(n) {
    const dic = this.board_cache.pop_lifo();
    const arrKey = Object.keys(dic);
    const Key = arrKey[0].split("x");
    //const row = parseIntKey[0];
    const col = parseInt(Key[1]);
    const board = dic[arrKey];
    save_to_cache(board, n, col + 1);
  }
};
