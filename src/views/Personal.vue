<template>
  <div class="view-wrapper list-page view-wrapper-contact-list">
    <DxDataGrid
      class="pa-3"
      :data-source="dtPersonal"
      :focused-row-enabled="true"
      key-expr="idTrabajador"
      :show-borders="true"
      column-resizing-mode="nextColumn"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-hiding-enabled="true"
      :column-auto-width="true"
      @CellDblClickEvent="handleRowDblClick"
    >
      <DxEditing :allow-updating="false" :use-icons="true" mode="form" />
      <DxColumn type="buttons" :width="130">
        <DxButton name="editar" icon="edit" hint="Editar" />
        <DxButton hint="Visualizar" icon="eyeopen" @click="" />
      </DxColumn>
      <DxColumnChooser :enabled="true" />
      <DxLoadPanel :enabled="true" />
      <DxPaging :page-size="10" />
      <DxColumnFixing :enabled="true" />
      <DxFilterRow :visible="showFilterRow" />
      <DxHeaderFilter :visible="showHeaderFilter" />
      <DxSearchPanel :visible="true" :width="240" placeholder="Buscar..." />
      <DxColumn
        data-field="idTrabajador"
        caption="Id"
        :visible="false"
        :enabled="false"
      />
      <DxColumn data-field="codigo" caption="Codigo" />
      <DxColumn data-field="apPaterno" caption="Ap. Paterno" />
      <DxColumn data-field="apMaterno" caption="Ap. Materno" />
      <DxColumn data-field="nombres" caption="Nombres" />
      <DxColumn data-field="nroDoc" caption="N° Doc" />
      <DxColumn
        data-field="idTipoDocumentoId"
        caption="Tipo Documento"
        :visible="false"
      >
        <DxLookup
          :data-source="dtTipoDocumentoId"
          value-expr="idTipoDocumentoId"
          display-expr="descripcion"
      /></DxColumn>
      <DxColumn data-field="idArea" caption="Area"
        ><DxLookup
          :data-source="dtArea"
          value-expr="idArea"
          display-expr="descripcion"
      /></DxColumn>
      <DxColumn data-field="idCargo" caption="Cargo"
        ><DxLookup
          :data-source="dtCargo"
          value-expr="idCargo"
          display-expr="descripcion"
      /></DxColumn>
      <DxColumn data-field="idEstado" caption="Estado" :visible="false">
      </DxColumn>
      <DxColumn data-field="idPais" caption="Pais"
        ><DxLookup
          :data-source="dtPais"
          value-expr="idPais"
          display-expr="descripcion"
      /></DxColumn>
      <DxColumn data-field="remuneracion" caption="Remuneracion" />
      <DxToolbar>
        <DxItem location="before" template="ComboEstado" />
        <DxItem location="before" template="BotonActualizar" />
        <DxItem location="after" template="BotonNuevo" />
        <DxItem location="after" template="BotonExportar" />
        <DxItem name="columnChooserButton" />
      </DxToolbar>
      <template #BotonNuevo>
        <div>
          <v-btn
            prepend-icon="add_circle"
            size="small"
            color="indigo"
            rounded="6"
            variant="tonal"
            @click="NuevoPersonal()"
            >Nuevo</v-btn
          >
          <EditarTrabajador
            v-model="mostrarModal"
            :idTrabajador="idTrabajador"
            :descripcion="txtNombres"
          />
        </div>
      </template>
      <template #BotonActualizar>
        <div>
          <v-btn
            icon="search"
            variant="outlined"
            density="compact"
            color="indigo"
            hint="Actualizar"
            @click = "ListarPersonal()"
          >
          </v-btn>
        </div>
      </template>
      <template #BotonExportar>
        <div>
          <v-btn
            size="small"
            prepend-icon="cloud_download"
            color="indigo"
            rounded="6"
            variant="tonal"
            >Exportar</v-btn
          >
        </div>
      </template>
      <template #ComboEstado>
        <DxSelectBox
          width="150"
          :items="estadoCombo"
          :value="estadoCombo[0]"
          :input-attr="{ 'aria-label': 'Estado  ' }"
          :show-clear-button="true"
          placeholder="Seleccione el Estado"
        />
      </template>
    </DxDataGrid>
  </div>
</template>

<script>
import axios from "axios";
import {
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxHeaderFilter,
  DxSearch,
  DxSearchPanel,
  DxToolbar,
  DxItem,
  DxButton,
  DxFilterRow,
  DxColumnChooser,
  DxGroupPanel,
  DxGrouping,
  DxPaging,
  DxLoadPanel,
  DxScrolling,
  DxColumnFixing,
  DxSummary,
  DxLookup,
  DxTotalItem,
  DxGroupItem,
  DxMasterDetail,
  DxStringLengthRule,
  DxRequiredRule,
  DxRangeRule,
  DxValueFormat,
} from "devextreme-vue/data-grid";
import DxTabPanel from "devextreme-vue/tab-panel";
import { useToast } from "vue-toastification";
import DxSelectBox from "devextreme-vue/select-box";
import DetallesTrabajador from "../components/DetallesTrabajador.vue";
import DatosGeneral from "../components/DatosGeneral.vue";
import EditarTrabajador from "../components/MantenimientoTrabajador.vue";
export default {
  components: {
    DxSelectBox,
    EditarTrabajador,
    DetallesTrabajador,
    DatosGeneral,
    DxColumnFixing,
    DxTabPanel,
    DxLoadPanel,
    DxColumnChooser,
    DxButton,
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxSearch,
    DxSearchPanel,
    DxFilterRow,
    DxToolbar,
    DxPaging,
    DxItem,
    DxHeaderFilter,
    DxGroupPanel,
    DxGrouping,
    DxScrolling,
    DxSummary,
    DxLookup,
    DxTotalItem,
    DxGroupItem,
    DxMasterDetail,
    DxStringLengthRule,
    DxRequiredRule,
    DxRangeRule,
    DxValueFormat,
  },
  data() {
    return {
      dtPersonal: [],
      idTrabajador: 0,
      dtTipoDocumentoId: [],
      dtPais: [],
      dtEstado: [],
      dtEmpresa: [],
      modalDetalles: false,
      dialog: false,
      txtNroDocumento: "",
      txtApMaterno: "",
      txtApPaterno: "",
      txtNombres: "",
      txtNombresCompletos: "",
      txtsueldo: 0.0,
      cboTipoDocumento: 0,
      cboPais: 0,
      cboEmpresa: 0,
      cboArea: 0,
      cboEstado: 0,
      showFilterRow: true,
      showHeaderFilter: true,
      currentFilter: 0,
      estadoCombo: ["Activo", "Inactivo"],
      editedItem: [
        {
          idPersonal: 0,
        },
      ],
      cboCargo: 0,
      mostrarModal: false,
      editedIndex: -1,
      form: false,
      search: "",
      dtArea: [],
      dtCargo: [],
    };
  },
  created() {
 //   this.ListarArea();
  //  this.ListarPais();
  //  this.ListarCargo();
  //  this.ListarEmpresa();
 //   this.ListarEstado();
  //  this.ListarTipoDocumentoId();
    this.ListarPersonal();
  },
  methods: {
    async ListarPersonal() {
      this.$axios.get("Trabajador/estado/1").then((response) => {
        this.dtPersonal = response.data.map((item) => {
          return { ...item, tipoDocumento: null };
        });
      });
    },

    //TipoDocumentoId
    async ListarTipoDocumentoId() {
      this.$axios.get("TipoDocumentoId").then((response) => {
        this.dtTipoDocumentoId = response.data;
      });
    },
    onItemClick(e) {
      const dataItem = e.dataItem;
      console.log(dataItem);
      this.TraerDatos(dataItem);
    },
    async ListarPais() {
      this.$axios.get("Pais").then((response) => {
        this.dtPais = response.data;
      });
    },
    async ListarEmpresa() {
      this.$axios.get("Empresa").then((response) => {
        this.dtEmpresa = response.data;
      });
    },
    async ListarEstado() {
      this.$axios.get("Estado").then((response) => {
        this.dtEstado = response.data;
      });
    },
    async ListarCargo() {
      this.$axios.get("Cargo").then((response) => {
        this.dtCargo = response.data;
      });
    },
    async ListarArea() {
      this.$axios.get("Area").then((response) => {
        this.dtArea = response.data;
      });
    },

    async TraerDatos(item) {
      console.log(item);
      // editedIndex.value = desserts.value.indexOf(item);
      var dato = Object.assign({}, item);
      this.idTrabajador = dato["idTrabajador"];
      this.cboTipoDocumento = dato["idTipoDocumentoId"];
      this.txtApPaterno = dato["apPaterno"];
      this.txtNroDocumento = dato["codigo"];
      this.txtApMaterno = dato["apMaterno"];
      this.txtNombres = dato["nombres"];
      this.txtNombresCompletos = dato["descripcion"];
      this.cboArea = dato["idArea"];
      this.cboCargo = dato["idCargo"];
      this.cboPais = dato["idPais"];
      this.cboEmpresa = dato["idEmpresaInterna"];
      this.txtsueldo = dato["remuneracion"];
      this.dialog = true;
    },

    async LimpiarDatos() {
      this.idTrabajador = 0;
      this.cboTipoDocumento = 0;
      this.txtApPaterno = "";
      this.txtNroDocumento = "";
      this.txtApMaterno = "";
      this.txtNombres = "";
      this.txtNombresCompletos = "";
      this.cboArea = 0;
      this.cboCargo = 0;
      this.cboPais = 0;
      this.cboEmpresa = 0;
      this.txtsueldo = "0.00";
    },

    async BuscarDni() {
      if (this.cboTipoDocumento === 1) {
        const ruta = "https://dniruc.apisperu.com/api/v1/dni/";
        const token =
          "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImNlc2FyZm1pcmFuZGEwQGdtYWlsLmNvbSJ9.GCVvRGDvXG6wY2_aVJhl2U_aitKrJlu0IV6kzB587AE";
        const url = ruta + this.txtNroDocumento + token;
        const response = await fetch(url);
        const data = await response.json();
        this.txtApPaterno = data.apellidoPaterno.toUpperCase();
        this.txtApMaterno = data.apellidoMaterno.toUpperCase();
        this.txtNombres = data.nombres.toUpperCase();
        this.txtNombresCompletos =
          data.nombres.toUpperCase() +
          " " +
          data.apellidoPaterno.toUpperCase() +
          " " +
          data.apellidoMaterno.toUpperCase();
      }
    },

    NuevoRegistro() {
      this.LimpiarDatos();
    },

    NuevoPersonal() {
      this.openModal();
      console.log("Hola");
    },
    openModal() {
      this.mostrarModal = true;
    },
    handleCerrarModal() {
      this.mostrarModal = false;
    },
    async EliminarDatos(item) {
      const toast = useToast();
      var dato = Object.assign({}, item);
      this.idTrabajador = dato["idTrabajador"];

      if (this.idTrabajador > 0) {
        const response = await this.$axios.delete(
          `Trabajador/?idTrabajador=${this.idTrabajador}`
        );
        if (response.status === 200) {
          toast.success("Registro Eliminado", {
            position: "bottom-right",
            timeout: 1728,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 1.38,
            showCloseButtonOnHover: true,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false,
          });
          this.ListarPersonal();
        } else {
          toast.error("No se pudo eliminar", {
            position: "bottom-right",
            timeout: 1728,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 1.38,
            showCloseButtonOnHover: true,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false,
          });
        }
      }
    },
    handleRowDblClick(e) {
      const rowData = e.data;
      alert(`Row double-clicked: ${JSON.stringify(rowData)}`);
    },
    async GuardarDatos() {
      const toast = useToast();
      var objTrabajador = {
        idTrabajador: this.idTrabajador,
        codigo: this.txtNroDocumento,
        descripcion: this.txtNombresCompletos,
        apPaterno: this.txtApPaterno,
        apMaterno: this.txtApMaterno,
        nombres: this.txtNombres,
        idTipoDocumentoId: this.cboTipoDocumento,
        nroDoc: this.txtNroDocumento,
        //  fechaIngreso: "2024-02-28T20:36:09.079Z",
        //  fechaCese: "2024-02-28T20:36:09.079Z",
        idArea: this.cboArea,
        idCargo: this.cboCargo,
        idEstado: 1,
        idUsuarioCreacion: 0,
        //     fechaCreacion: "2024-02-28T20:36:09.079Z",
        idUsuarioModificacion: 0,
        //   fechaUltimaModificacion: "2024-02-28T20:36:09.079Z",
        idUsuarioAnulacion: 0,
        //   fechaAnulacion: "2024-02-28T20:36:09.079Z",
        idPais: this.cboPais,
        idEmpresaInterna: this.cboEmpresa,
        bSupervisor: true,
        remuneracion: this.txtsueldo,
        horasExtras: 0,
        asignacionFamiliar: 0,
        epps: 0,
        costoLaboral: 0,
        remuneracionBruta: 0,
        gratificacion: 0,
        cts: 0,
        vacaciones: 0,
        costoEpps: 0,
        idUsuarioModificacionCl: 0,
        //    fechaUltimaModificacionCl: "2024-02-28T20:36:09.079Z",
        cDiario: 0,
      };

      if (objTrabajador.idTrabajador === 0) {
        const response = await this.$axios.post("Trabajador", objTrabajador);
        if (response.status === 200) {
          toast.success("Registro Insertado", {
            position: "bottom-right",
            timeout: 1728,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 1.38,
            showCloseButtonOnHover: true,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false,
          });
          this.dialog = false;
          this.ListarPersonal();
        } else {
          toast.error("No se pudo registrar", {
            position: "bottom-right",
            timeout: 1728,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 1.38,
            showCloseButtonOnHover: true,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false,
          });
        }
      }
      if (objTrabajador.idTrabajador > 0) {
        const response = await this.$axios.put("Trabajador", objTrabajador);
        if (response.status === 200) {
          toast.success("Registro Actualizado", {
            position: "bottom-right",
            timeout: 1728,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 1.38,
            showCloseButtonOnHover: true,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false,
          });
          this.dialog = false;
          this.ListarPersonal();
        } else {
          toast.error("No se pudo actualizar", {
            position: "bottom-right",
            timeout: 1728,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 1.38,
            showCloseButtonOnHover: true,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false,
          });
        }
      }
    },

    MostrarDetallesTrabajador(item) {
      var dato = Object.assign({}, item);
      this.idTrabajador = dato["idTrabajador"];
      this.modalDetalles = true;
      this.txtNombresCompletos = dato["descripcion"];
    },
  },
};
</script>
<style>
.selected-row {
  background-color: rgb(90, 104, 182);
}
.v-text-field input {
  font-size: small;
}
.v-field__input {
  font-size: small;
}
.hidden-xs-only {
  display: none;
}
.view-wrapper {
  position: absolute;
  top: 2;
  bottom: 1;
  left: 1;
  right: 0;
  flex-direction: row;

  .grid {
    .name-template {
      .position {
        font-size: 12px;
        color: var(--texteditor-label-color);
      }
    }

    :deep(.dx-datagrid-header-panel) {
      padding: 0 var(--content-padding);

      .dx-toolbar {
        margin-bottom: 0;
        margin-top: 2;
        padding: var(--toolbar-margin-bottom) 0;
      }
    }

    :deep(.dx-datagrid-content .dx-row) {
      cursor: pointer;
    }


  }
}
</style>
