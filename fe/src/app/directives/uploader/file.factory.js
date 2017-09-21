angular.module('app')
  .factory('File', () => {

    class File extends BaseFactory {
      constructor({ name = null, fileExtension = null, path = null, size = null, id = null, tag= null, isActive = null, isDeleted = null, createdBy = null, createdAt = null, updatedBy = null, updatedAt = null }) {

        super({ name, fileExtension, path, size, id, isActive, isDeleted, createdBy, createdAt, updatedBy, updatedAt , tag });
      }

      get faType() {
        //list of extensions taken from https://en.wikipedia.org/wiki/List_of_Microsoft_Office_filename_extensions
        //word extensions
        if (this.fileExtension.match(/doc|dot|wbk/g)) {
          return '-word-o';
        }
        else if (this.fileExtension.match(/xl/g)) {
          return '-excel-o';
        }
        else if (this.fileExtension.match(/pp|po|sld/g)) {
          return '-powerpoint-o';
        }
        else if (this.fileExtension.match(/jpg|png|bmp/g)) {
          return '-image-o';
        }
        else if (this.fileExtension.match(/pdf/g)) {
          return '-pdf-o';
        }
        else if (this.fileExtension.match(/txt/g)) {
          return '-text-o';
        }
        else {
          return '-o';
        }

        /*switch (this.fileExtension) {

          //word extensions
          //text.match(/doc|dot|wbk/g);
          case 'doc':
          case 'docx':
          case 'dot':
          case 'wbk':
          case 'docm':
          case 'dotx':
          case 'dotm':
          case 'docb':
            return '-word-o';
            break;

          //excel extensions
          case 'xls':
          case 'xlt':
          case 'xlm':
          case 'xlsx':
          case 'xlsm':
          case 'xltx':
          case 'xltm':
            return '-excel-o';
            break;

          //powerpoint extensions
          case 'ppt':
          case 'pot':
          case 'pps':
          case 'pptx':
          case 'pptm':
          case 'potx':
          case 'potm':
          case 'ppam':
          case 'ppsx':
          case 'ppsm':
          case 'sldx':
          case 'sldm':
            return '-powerpoint-o';
            break;

          //image extensions
          case 'jpg':
          case 'png':
          case 'bmp':
            return '-image-o';
            break;

          //pdf
          case 'pdf':
            return '-pdf-o';
            break;

          case 'txt':
            return 'text-o';
            break;

          default:
            return '-o';
            break;

        }*/
      }

      putPayload(field, value) {     
        // Edit In-place update
     
            return {
              [field]: value,
              
            };

            
      }
    }

    return File;
  });
