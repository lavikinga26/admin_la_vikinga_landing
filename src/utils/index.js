const UTILS = {
    filters: {
        only_numbers($event) {
            let keyCode = $event.keyCode ? $event.keyCode : $event.which;
            if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
              $event.preventDefault();
            }
          },
    },
    rules :{
      only_numbers : [
        value =>
          !!value || "Campo es requerido",
        value => {
          const pattern = /^\d+$/
          return pattern.test(value) || 'Este campo solo admite numeros'
        }
      ],
      required: [
        value =>
        !!value || "Campo es requerido",
      ],
      fail: [
        value =>
        false || "El campo es invalido",
      ]
    },
    const:{
      TIMEOUT:1000,
      REFRESH:100,
    },
}
export default UTILS;