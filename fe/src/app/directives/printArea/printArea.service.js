;(() => {

let counter = 0;
let modes = { iframe : 'iframe', popup : 'popup' };
let standards = { strict : 'strict', loose : 'loose', html5 : 'html5' };
let defaults = {
  mode       : modes.iframe,
  standard   : standards.html5,
  popHt      : 500,
  popWd      : 400,
  popX       : 200,
  popY       : 200,
  popTitle   : '',
  popClose   : false,
  extraCss   : '',
  extraHead  : '',
  retainAttr : ['id','class','style']
};

let settings = {};//global settings

$.fn.printArea = function(options, PrintAreaService) {
  $.extend(settings, defaults, options);

  counter++;
  let idPrefix = 'printArea_';
  $('[id^=\'' + idPrefix + ']').remove();

  settings.id = idPrefix + counter;

  let $printSource = $(this);

  let PrintAreaWindow = PrintAreaService.getPrintWindow();
  PrintAreaService.write(PrintAreaWindow.doc, $printSource);

  setTimeout(function() {
    PrintAreaService.print(PrintAreaWindow);
  }, 1000);
};

class PrintAreaService {
  constructor() {

  }

  print(PAWindow) {
    let paWindow = PAWindow.win;

    $(PAWindow.doc).ready(function() {
      paWindow.focus();
      paWindow.print();

      if (settings.mode === modes.popup && settings.popClose) {
        setTimeout(function() {
          paWindow.close();
        }, 2000);
      }
    });
  }

  write(PADocument, $ele) {
    PADocument.open();
    PADocument.write(this.docType() + '<html>' + this.getHead() + this.getBody($ele) + '</html>');
    PADocument.close();
  }

  docType() {
    if (settings.mode === modes.iframe) {
      return '';
    }

    if (settings.standard === standards.html5) {
      return '<!DOCTYPE html>';
    }

    let transitional = settings.standard === standards.loose ? ' Transitional' : '';
    let dtd = settings.standard === standards.loose ? 'loose' : 'strict';

    return '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01' + transitional + '//EN" "http://www.w3.org/TR/html4/' + dtd +  '.dtd">';
  }

  getHead() {
    let extraHead = '';
    let links = '';

    if (settings.extraHead) {
      settings.extraHead.replace(/([^,]+)/g, function(m) { extraHead += m });
    }

    $(document).find('link')
      .filter(function() { // Requirement: <link> element MUST have rel="stylesheet" to be considered in print document
        let relAttr = $(this).attr('rel');
        return ($.type(relAttr) === 'undefined') === false && relAttr.toLowerCase() === 'stylesheet';
      })
      .filter(function() { // Include if media is undefined, empty, print or all
        let mediaAttr = $(this).attr('media');
        return $.type(mediaAttr) === 'undefined' || mediaAttr === '' || mediaAttr.toLowerCase() === 'print' || mediaAttr.toLowerCase() === 'all'
      })
      .each(function() {
        links += '<link type="text/css" rel="stylesheet" href="' + $(this).attr('href') + '" >';
      });

    if (settings.extraCss) {
      settings.extraCss.replace(/([^,\s]+)/g, function(m){ links += '<link type="text/css" rel="stylesheet" href="' + m + '">' });
    }

    return '<head><title>' + settings.popTitle + '</title>' + extraHead + links + '</head>';
  }

  getBody(elements) {
    let html = '';
    let attrs = settings.retainAttr;
    let getBodyScope = this;
    elements.each(function($scope) {
      let ele = getBodyScope.getFormData($(this));

      let attributes = ''

      for (let x = 0; x < attrs.length; x++) {
        let eleAttr = $(ele).attr(attrs[x]);
        if (eleAttr) {
          attributes += (attributes.length > 0 ? ' ':'') + attrs[x] + '=\'' + eleAttr + '\'';
        }
      }

      html += '<div ' + attributes + '>' + $(ele).html() + '</div>';
    });

    return '<body>' + html + '</body>';
  }

  getFormData(ele) {
    let copy = ele.clone();
    let copiedInputs = $('input,select,textarea', copy);

    $('input,select,textarea', ele).each(function(i) {
      let typeInput = $(this).attr('type');

      if ($.type(typeInput) === 'undefined') {
        typeInput = $(this).is('select') ? 'select' : $(this).is('textarea') ? 'textarea' : '';
      }

      let copiedInput = copiedInputs.eq(i);

      if (typeInput === 'radio' || typeInput === 'checkbox') {
        copiedInput.attr('checked', $(this).is(':checked'));
      }
      else if (typeInput === 'text') {
        copiedInput.attr('value', $(this).val());
      }
      else if (typeInput === 'select') {
        $(this).find('option').each(function(i) {
          if ($(this).is(':selected')) {
            $('option', copiedInput).eq(i).attr('selected', true);
          }
        });
      }
      else if (typeInput === 'textarea') {
        copiedInput.text($(this).val());
      }
    });

    return copy;
  }

  getPrintWindow() {
    switch (settings.mode) {
      case modes.iframe :
        let f = this.iframe();
        return { win : f.contentWindow || f, doc : f.doc };
      case modes.popup :
        let p = this.popup();
        return { win : p, doc : p.doc };
    }
  }

  iframe() {
    let frameId = settings.id;
    let iframeStyle = 'border:0;position:absolute;width:0px;height:0px;right:0px;top:0px;';
    let iframe;

    try {
      iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      $(iframe).attr({ style: iframeStyle, id: frameId, src: '#' + new Date().getTime() });
      iframe.doc = null;
      iframe.doc = iframe.contentDocument ? iframe.contentDocument : (iframe.contentWindow ? iframe.contentWindow.document : iframe.document);

    } catch (e) {
      throw e + '. iframes may not be supported in this browser.';
    }

    if (iframe.doc === null) {
      throw 'Cannot find document.';
    }

    return iframe;
  }

  popup() {
    let windowAttr = 'location=yes,statusbar=no,directories=no,menubar=no,titlebar=no,toolbar=no,dependent=no';
    windowAttr += ',width=' + settings.popWd + ',height=' + settings.popHt;
    windowAttr += ',resizable=yes,screenX=' + settings.popX + ',screenY=' + settings.popY + ',personalbar=no,scrollbars=yes';

    let newWin = window.open('', '_blank',  windowAttr);

    newWin.doc = newWin.document;

    return newWin;
  }
};

angular.module('app')
  .service('PrintAreaService', PrintAreaService);

})();
