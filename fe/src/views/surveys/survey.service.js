;(() => {

class SurveyService extends BaseService {
  constructor(RESTful, Message, $uibModal, $q) {
    super();
    this.RESTful = RESTful;
    this.Message = Message;
    this.$uibModal = $uibModal;
    this.$q = $q;
  }

  list(query, wellboreId) {
    query.expand = _.isString(query.expand) ? query.expand : this.getExpand('surveys', 'list');
    let params = this.getQueryString(query);

    return this.RESTful.get(`wellbores/${wellboreId}/surveys`, params);
  }

  get(id) {
    return this.RESTful.get(`well/wellbore/survey/${id}`);
  }

  create(payload) {
    return this.RESTful.post('surveys', payload)
      .then((response) => {
        this.Message.create('survey');
        return response;
      });
  }

  bulk(payload) {
    return this.RESTful.post('surveys/bulk', payload)
      .then((response) => {
        this.Message.create('surveys');
        return response;
      });
  }

  processFile(data) {
    let defer = this.$q.defer(),
        surveys = [];

    if (!_.isEmpty(data) && _.isString(data)) {
      let content = data.split(/\r?\n/g);

      if (_.size(content)) {
        _.each(content, (value) => {
          let line = value.trim();
          // Empty line
          if (_.isEmpty(line)) {
            return;
          }
          // Setting line (sep=;)
          if (s.contains(line, '=')) {
            return;
          }

          let surveyArr = line.split(';');
          // Si la separación no es por ; sino por ,
          if (surveyArr.length < 4) {
            surveyArr = line.split(',');
          }
          // Si no tiene 4 valores
          if (surveyArr.length !== 4) {
            return;
          }

          let surveyValues = this._convertValues(surveyArr);
          // Si los 4 valores se pudieron convertir en float
          if (!_.isEmpty(surveyValues)) {
            surveys.push({
              measuredDepth: surveyValues[0],
              inclination: surveyValues[1],
              azimuth: surveyValues[2],
              holeDepth: surveyValues[3],
            });
          }
        });
        // Removing duplicates
        surveys = _.uniq(surveys, (value) => angular.toJson(value));
        // Sort
        surveys = _.sortBy(surveys, (value) => value.measuredDepth);
      }
    }

    defer.resolve(surveys);

    return defer.promise;
  }

  _convertValues(surveyArr) {
    let ret = [];
    // Empieza la conversión de los valores
    for (let i = 0, len = _.size(surveyArr); i < len; i++) {
      let value = surveyArr[i];

      if (_.isEmpty(value)) {
        return;
      }
      // Si los decimales estan separados por , reemplazo las comas por .
      value = value.replace(/,/g, '.');

      // Si no es un numero lo ginoro
      if (_.isNaN(value)) {
        return;
      }

      value = parseFloat(value);

      // Es un numero
      if (!_.isNaN(value)) {
        ret.push(value);
      }
    }
    return _.size(ret) === 4 ? ret : null;
  }

  update(id, payload, inPlace = false) {
    let promise = inPlace
      ? this.RESTful.patch(`surveys/${id}`, payload)
      : this.RESTful.put('surveys', payload);

    return promise.then((response) => {
        this.Message.update('survey');
        return response;
      });
  }

  openCreateModal(job, wellbore) {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'surveysNew',
      keyboard: true,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: 'static',
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'compose-md',
      resolve: {
        job: () => job,
        wellbore: () => wellbore,
      }
    });

    return modalInstance.result;
  }

  openBulkModal(job, wellbore) {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'surveysBulk',
      keyboard: true,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: 'static',
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'md',
      resolve: {
        job: () => job,
        wellbore: () => wellbore,
      }
    });

    return modalInstance.result;
  }
};

angular.module('app')
  .service('SurveyService', SurveyService);

})();
