
function Matrix() {
   this._data = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]];
   this._tmp1 = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]];
   this._tmp2 = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]];
}

Matrix.prototype = {

   toGPUMatrix : function(dst) {
      var row, col;
      for (row = 0 ; row < 4 ; row++)
         for (col = 0 ; col < 4 ; col++)
	    dst[row + 4 * col] = this._data[row][col];
   },

   toString : function() {
      var row, col, s = '';
      for (row = 0 ; row < 4 ; row++) {
         s += row == 0 ? '[[' : ' [';
         for (col = 0 ; col < 4 ; col++)
            s += this._data[row][col] + (col < 3 ? ',' : row < 3 ? '],\n' : ']]\n');
      }
      return s;
   },

   transform : function(src, dst) {
      var A = this._data,
          x = src.x,
          y = src.y,
	  z = src.z,
	  w = src.w !== undefined ? src.w : 1;
      dst.x = A[0][0] * x + A[0][1] * y + A[0][2] * z + A[0][3] * w;
      dst.y = A[1][0] * x + A[1][1] * y + A[1][2] * z + A[1][3] * w;
      dst.z = A[2][0] * x + A[2][1] * y + A[2][2] * z + A[2][3] * w;
      if (dst.w !== undefined)
         dst.w = A[3][0] * x + A[3][1] * y + A[3][2] * z + A[3][3] * w;
   },

   identity : function() {
      this._makeIdentity(this._data);
   },

   translate : function(x, y, z) {
      this._makeTranslation(this._tmp1, x, y, z);
      this._multiply(this._tmp1);
   },
   rotateX: function() {

   }, 
   rotateY: function() {

   }, 
   rotateZ: function() {

   }, 
   scale: function() {

   }, 
   perspective: function() {

   },

   //////////////////////// INTERNAL METHODS ////////////////////////////

   _makeIdentity : function(dst) {
      var row, col;
      for (row = 0 ; row < 4 ; row++)
         for (col = 0 ; col < 4 ; col++)
            dst[row][col] = row == col;
   },

   _makeTranslation : function(dst, x, y, z) {
      this._makeIdentity(dst);
      dst[0][3] = x;
      dst[1][3] = y;
      dst[2][3] = z;
   },

   _multiply : function(src) {
      var A = this._data, B = src, row, col;
      for (row = 0 ; row < 4 ; row++)
         for (col = 0 ; col < 4 ; col++)
	    this._tmp2[row][col] = A[row][0] * B[0][col] +
				   A[row][1] * B[1][col] +
	                           A[row][2] * B[2][col] +
	                           A[row][3] * B[3][col] ;
      for (row = 0 ; row < 4 ; row++)
         for (col = 0 ; col < 4 ; col++)
	    this._data[row][col] = this._tmp2[row][col];
   },
}

