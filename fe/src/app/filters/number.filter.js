angular.module('app')
// Transforms 1000 to 1K, 1000000 to 1M
.filter('numberPrettify', () => {
	  return (n) => {
	  	if (!n) {
	  		return n;
	  	}

	  	let _n = n;
	  	let r = 0;

	  	while (_n >= 1000) {
	  		_n /= 1000;
	  		r++;
	  	}

	  	let s = String(_n);
	  	let sp = s.split('.');
	  	let l = (r === 0 ? '' : (r === 1 ? 'K' : 'M'));

	  	return sp[0] + (sp.length > 1 ? '.' + sp[1][0] : '') + l
	  	//return sp[0] + l;
	  };
	})
