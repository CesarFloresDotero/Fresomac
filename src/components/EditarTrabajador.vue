<template>
  <v-dialog
    v-model="mostrarModal"
    fullscreen
    persistent
    transition="dialog-bottom-transition"
  >
    <!-- Contenido del modal -->
    <v-container>
      <v-card height="700">
        <v-toolbar color="indigo-lighten-1">
          <v-toolbar-title class="text-h6">{{ descripcion }}</v-toolbar-title>
        </v-toolbar>
        <div class="d-flex flex-row">
          <v-tabs v-model="tab" color="primary" direction="vertical">
            <v-tab value="personales">
              <v-icon start> account_circle </v-icon>
              Datos Personales
            </v-tab>
            <v-tab value="laborales">
              <v-icon start> engineering </v-icon>
              Datos Laborales
            </v-tab>
            <v-tab value="contratos">
              <v-icon start> inventory </v-icon>
              Contrato
            </v-tab>
            <v-tab value="capacitaciones">
              <v-icon start> settings_accessibility </v-icon>
              Datos Familiares
            </v-tab>
          </v-tabs>
          <v-window v-model="tab">
            <v-window-item value="personales">
              <v-card flat>
                <v-container class="">
                  <v-row>
                    <v-col>
                      <DxSelectBox
                        :items="dtTipoDocumentoId"
                        value-expr="idTipoDocumentoId"
                        display-expr="descripcion"
                        hint="Tipo Documento"
                        :show-clear-button="true"
                        placeholder="Tipo Documento"
                      />
                    </v-col>
                    <v-col>
                      <DxTextBox
                        placeholder="N° Documento"
                        v-model="txtNroDocumento"
                      />
                    </v-col>
                    <v-col>
                      <v-btn
                        size="x-small"
                        prepend-icon="search"
                        rounded="lg"
                        color="indigo"
                        variant="tonal"
                        >Buscar Dni</v-btn
                      >
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <DxTextBox placeholder="Nombres" v-model="txtnombre" />
                    </v-col>
                    <v-col>
                      <DxTextBox
                        placeholder="Ap. Paterno"
                        v-model="txtApPaterno"
                      />
                    </v-col>
                    <v-col>
                      <DxTextBox
                        placeholder="Ap. Materno"
                        v-model="txtApMaterno"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <DxSelectBox
                        :items="dtEstadoCivil"
                        value-expr="idTipoDocumentoId"
                        display-expr="descripcion"
                        hint="Area"
                        :show-clear-button="true"
                        placeholder="Estado Civil"
                      />
                    </v-col>
                    <v-col>
                      <DxSelectBox
                        :items="cboDepartamento"
                        value-expr="idTipoDocumentoId"
                        display-expr="descripcion"
                        hint="Tipo Documento"
                        :show-clear-button="true"
                        placeholder="Departamento"
                      />
                    </v-col>
                    <v-col>
                      <DxSelectBox
                        :items="cboProvincia"
                        value-expr="idTipoDocumentoId"
                        display-expr="descripcion"
                        hint="Tipo Documento"
                        :show-clear-button="true"
                        placeholder="Provincia"
                      />
                    </v-col>
                    <v-col>
                      <DxSelectBox
                        :items="cboDistrito"
                        value-expr="idTipoDocumentoId"
                        display-expr="descripcion"
                        hint="Tipo Documento"
                        :show-clear-button="true"
                        placeholder="Distrito"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <DxTextBox placeholder="Avenida" v-model="txtAvenida" />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <DxSelectBox
                        :items="cboEmpresa"
                        value-expr="idTipoDocumentoId"
                        display-expr="descripcion"
                        hint="Empresa"
                        :show-clear-button="true"
                        placeholder="Empresa"
                      />
                    </v-col>
                    <v-col>
                      <DxSelectBox
                        :items="cboNacionalidad"
                        value-expr="idTipoDocumentoId"
                        display-expr="descripcion"
                        hint="Nacionalidad"
                        :show-clear-button="true"
                        placeholder="Nacionalidad"
                      />
                    </v-col>
                    <v-col>
                      <DxSelectBox
                        :items="cboEstado"
                        value-expr="idTipoDocumentoId"
                        display-expr="descripcion"
                        hint="Estado"
                        :show-clear-button="true"
                        placeholder="Estado"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-window-item>
            <v-window-item value="laborales">
              <v-card flat>
                <v-container>
                  <v-row>
                    <v-col>
                      <DxDateBox
                        :value="now"
                        :input-attr="{ 'aria-label': 'Date' }"
                        type="date"
                      />
                    </v-col>
                    <v-col>
                      <DxSelectBox
                        :items="cboTipoTrabajador"
                        value-expr="idTipoDocumentoId"
                        display-expr="descripcion"
                        hint="Tipo Documento"
                        :show-clear-button="true"
                        placeholder="Tipo Trabajador"
                      />
                    </v-col>
                    <v-col>
                      <DxSelectBox
                        :items="cboContrato"
                        value-expr="idTipoDocumentoId"
                        display-expr="descripcion"
                        hint="Tipo Documento"
                        :show-clear-button="true"
                        placeholder="Contrato"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <DxSelectBox
                        :items="cboArea"
                        value-expr="idTipoDocumentoId"
                        display-expr="descripcion"
                        hint="Tipo Documento"
                        :show-clear-button="true"
                        placeholder="Area"
                      />
                    </v-col>
                    <v-col>
                      <DxSelectBox
                        :items="cboCargo"
                        value-expr="idTipoDocumentoId"
                        display-expr="descripcion"
                        hint="Tipo Documento"
                        :show-clear-button="true"
                        placeholder="Cargo"
                      />
                    </v-col>
                    <v-col>
                      <DxSelectBox
                        :items="cboRegimenLaboral"
                        value-expr="idTipoDocumentoId"
                        display-expr="descripcion"
                        hint="Area"
                        :show-clear-button="true"
                        placeholder="Régimen Laboral"
                      />
                    </v-col>
                    <v-col>
                      <DxSelectBox
                        :items="cboCese"
                        value-expr="idTipoDocumentoId"
                        display-expr="descripcion"
                        hint="Motivo Cese"
                        :show-clear-button="true"
                        placeholder="Motivo Cese"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <DxTextBox
                        placeholder="Remuneracion"
                        v-model="txtRemuneracion"
                      />
                    </v-col>
                    <v-col>
                      <DxTextBox
                        placeholder="Asig. Familiar"
                        :disabled="true"
                        v-model="txtAsignacionFamiliar"
                      />
                    </v-col>
                    <v-col>
                      <v-btn
                        icon="search"
                        variant="outlined"
                        density="compact"
                        color="indigo"
                        hint="Actualizar"
                      ></v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-window-item>
            <v-window-item value="contratos">
              <v-card flat>
                <v-card-text>
                  <p>
                    Sed aliquam ultrices mauris. Donec posuere vulputate arcu.
                    Morbi ac felis. Etiam feugiat lorem non metus. Sed a libero.
                  </p>

                  <p>
                    Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel,
                    lacus. Aenean tellus metus, bibendum sed, posuere ac, mattis
                    non, nunc. Aliquam lobortis. Aliquam lobortis. Suspendisse
                    non nisl sit amet velit hendrerit rutrum.
                  </p>

                  <p class="mb-0">
                    Phasellus dolor. Fusce neque. Fusce fermentum odio nec arcu.
                    Pellentesque libero tortor, tincidunt et, tincidunt eget,
                    semper nec, quam. Phasellus blandit leo ut odio.
                  </p>
                </v-card-text>
              </v-card>
            </v-window-item>
            <v-window-item value="vacaciones">
              <v-card flat>
                <v-card-text>
                  <p>
                    Morbi nec metus. Suspendisse faucibus, nunc et pellentesque
                    egestas, lacus ante convallis tellus, vitae iaculis lacus
                    elit id tortor. Sed mollis, eros et ultrices tempus, mauris
                    ipsum aliquam libero, non adipiscing dolor urna a orci.
                    Curabitur ligula sapien, tincidunt non, euismod vitae,
                    posuere imperdiet, leo. Nunc sed turpis.
                  </p>

                  <p>
                    Suspendisse feugiat. Suspendisse faucibus, nunc et
                    pellentesque egestas, lacus ante convallis tellus, vitae
                    iaculis lacus elit id tortor. Proin viverra, ligula sit amet
                    ultrices semper, ligula arcu tristique sapien, a accumsan
                    nisi mauris ac eros. In hac habitasse platea dictumst. Fusce
                    ac felis sit amet ligula pharetra condimentum.
                  </p>

                  <p>
                    Sed consequat, leo eget bibendum sodales, augue velit cursus
                    nunc, quis gravida magna mi a libero. Nam commodo suscipit
                    quam. In consectetuer turpis ut velit. Sed cursus turpis
                    vitae tortor. Aliquam eu nunc.
                  </p>

                  <p>
                    Etiam ut purus mattis mauris sodales aliquam. Ut varius
                    tincidunt libero. Aenean viverra rhoncus pede. Duis leo.
                    Fusce fermentum odio nec arcu.
                  </p>

                  <p class="mb-0">
                    Donec venenatis vulputate lorem. Aenean viverra rhoncus
                    pede. In dui magna, posuere eget, vestibulum et, tempor
                    auctor, justo. Fusce commodo aliquam arcu. Suspendisse enim
                    turpis, dictum sed, iaculis a, condimentum nec, nisi.
                  </p>
                </v-card-text>
              </v-card>
            </v-window-item>
            <v-window-item value="descargos">
              <v-card flat>
                <v-card-text>
                  <p>
                    Fusce a quam. Phasellus nec sem in justo pellentesque
                    facilisis. Nam eget dui. Proin viverra, ligula sit amet
                    ultrices semper, ligula arcu tristique sapien, a accumsan
                    nisi mauris ac eros. In dui magna, posuere eget, vestibulum
                    et, tempor auctor, justo.
                  </p>

                  <p class="mb-0">
                    Cras sagittis. Phasellus nec sem in justo pellentesque
                    facilisis. Proin sapien ipsum, porta a, auctor quis, euismod
                    ut, mi. Donec quam felis, ultricies nec, pellentesque eu,
                    pretium quis, sem. Nam at tortor in tellus interdum
                    sagittis.
                  </p>
                </v-card-text>
              </v-card>
            </v-window-item>
          </v-window>
        </div>
      </v-card>
      <v-footer>
        <v-row>
          <v-col>
            <v-btn
              @click="cerrarModal"
              prepend-icon="cancel"
              class="ml-2 mr-2"
              color="blue-grey"
              rounded="xl"
              >Cerrar</v-btn
            ><v-btn prepend-icon="save" color="indigo" rounded="xl"
              >Guardar</v-btn
            >
          </v-col>
        </v-row>
      </v-footer>
    </v-container>
  </v-dialog>
</template>

<script>
import DxTextBox from "devextreme-vue/text-box";
import DxSelectBox from "devextreme-vue/select-box";
import DxDateBox from "devextreme-vue/date-box";
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
    DxDateBox,
  },
  data() {
    return {
      mostrarModal: this.modelValue,
      tab: "personales",
      dtTipoDocumentoId: [],
      dtSexo: [],
      dtEstadoCivil: [],
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
      cboContratoAsignado: 0,
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
      txtApPaterno: "",
      txtCorreo: "",
      txtHijos: 0,
      txtLocker: "",
      txtNroDocumento: 0,
      txtTelefono: 0,
      dateFechaNacimiento: null,
      dateFechaIngreso: new Date(),
      dateFechaCese: null,
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
    this.ListarTipoDocumentoId();
  },

  methods: {
    async ListarTipoDocumentoId() {
      this.$axios.get("TipoDocumentoId").then((response) => {
        this.dtTipoDocumentoId = response.data;
      });
    },
    cerrarModal() {
      this.mostrarModal = false;
    },
  },
};
</script>
