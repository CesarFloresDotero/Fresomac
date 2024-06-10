<template>
  <DxPopup
    :width="660"
    :height="540"
    :show-title="true"
    title="Nuevo Trabajador"
    :drag-enabled="false"
    :hide-on-outside-click="true"
    v-model:visible="mostrarModal"
    :show-close-button="true"
  >
    <template #content="{ data }">
      <div class="agent-details">
        <v-row>
          <v-col cols="12" mx-1>
            <DxSelectBox
              :search-enabled="true"
              search-mode="contains"
              :data-source="dtTipoDocumento"
              v-model="cboTipoDocumento"
              value-expr="idTipoDocumentoId"
              display-expr="abreviatura"
              :show-clear-button="true"
              placeholder="Tipo de Documento"
            />
          </v-col>
          <v-col>
            <DxTextBox placeholder="N° Documento" v-model="txtNroDocumento" />
          </v-col>
          <v-col>
            <v-btn icon="manage_search" color="indigo darken-2" size="small">
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </template>
  </DxPopup>
</template>

<script>
import DxTextBox from "devextreme-vue/text-box";
import DxSelectBox from "devextreme-vue/select-box";
import DxDateBox from "devextreme-vue/date-box";
import DxPopup from "devextreme-vue/popup";
export default {
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    idTrabajador: Number,
    descripcion: String,
  },
  components: {
    DxTextBox,
    DxSelectBox,
    DxPopup,
    DxDateBox,
  },
  data() {
    return {
      mostrarModal: this.modelValue,
      tab: "personales",
      dtTipoDocumento: [],
      dtSexo: [],
      dtEstadoCivil: [],
      cboTipoDocumento: 1,
      cboDepartamento: 0,
      cboProvincia: 0,
      cboDistrito: 0,
      cboEstado: 0,
      cboEmpresa: 0,
      cboMotivoCese: 0,
      cboSexo: 0,
      cboEstadoCivil: 0,
      cboNacionalidad: 0,
      cboCese: 0,
      cboTipoTrabajador: 0,
      cboTipoContrato: 0,
      cboContrato: 0,
      cboArea: 0,
      cboCargo: 0,
      cboRegimenLaboral: 0,
      cboBancos: 0,
      cboCts: 0,
      txtRemuneracion: "",
      txtAsignacionFamiliar: "",
      txtNombres: "",
      txtApPaterno: "",
      txtAvenida: "",
      txtApMaterno: "",
      txtCorreo: "",
      txtHijos: 0,
      txtLocker: "",
      txtNroDocumento: "",
      txtNombresCompletos: "",
      txtTelefono: 0,
      dateFechaNacimiento: null,
      dateFechaIngreso: new Date(),
      dateFechaCese: null,
      reglas: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length <= 20 || "Max 20 characters",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
  watch: {
    modelValue(val) {
      this.mostrarModal = val;
    },
    mostrarModal(val) {
      this.$emit("update:modelValue", val);
    },
  },

  created() {
    this.ListarTipoDocumento();
  },

  methods: {
    async ListarTipoDocumento() {
      this.$axios.get("TipoDocumento/Listar").then((response) => {
        this.dtTipoDocumento = response.data;
        console.log(response.data);
      });
    },
    submit() {
      this.$refs.form.validate();
      if (this.valid) {
        alert("Form is valid");
        // Realiza alguna acción, como enviar los datos
      } else {
        alert("Form is invalid");
      }
    },
    cerrarModal() {
      this.mostrarModal = false;
    },
    customDropdownRenderer() {
      return {
        template: '<div class="custom-dropdown"></div>',
      };
    },
  },
};
</script>
<style>
.custom-dropdown {
  z-index: 2000 !important; /* Asegúrate de que este valor sea mayor que el z-index del v-dialog */
}
</style>
