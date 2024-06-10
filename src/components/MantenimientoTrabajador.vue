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

    <!-- Contenido del modal -->
    <v-container>
      <v-card height="700">
        <v-toolbar color="indigo-lighten-1">
          <v-toolbar-title class="text-h6">{{ descripcion }}</v-toolbar-title>
          <v-btn
            @click="cerrarModal"
            icon="cancel"
            class="ml-2 mr-2"
            color="warning"
            rounded="xl"
          ></v-btn>
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
                      <v-autocomplete
                        :items="dtTipoDocumento"
                        base-color="indigo"
                        v-model="cboTipoDocumento"
                        variant="solo"
                        item-title="abreviatura"
                        density="compact"
                        color="indigo"
                        item-value="idTipoDocumentoId"
                        label="Tipo Documento"
                      ></v-autocomplete>
                    </v-col>
                    <v-col>
                      <v-text-field
                        append-inner-icon="badge"
                        density="compact"
                        label="N° Documento"
                        variant="solo"
                        type="input"
                        clearable
                        color="indigo"
                        maxlength="10"
                        counter
                        :v-model="txtNroDocumento"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-btn
                        icon="manage_search"
                        color="indigo darken-2"
                        size="small"
                      >
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        clearable
                        label="Nombres"
                        density="compact"
                        variant="solo"
                        v-model="txtNombres"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        clearable
                        label="Ap. Paterno"
                        density="compact"
                        variant="solo"
                        v-model="txtApPaterno"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        clearable
                        label="Ap. Materno"
                        density="compact"
                        variant="solo"
                        v-model="txtApMaterno"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="ma-1">
                    <v-text-field
                      clearable
                      label="Nombres Completos"
                      density="compact"
                      variant="solo"
                      v-model="txtNombresCompletos"
                    ></v-text-field>
                  </v-row>
                  <v-row>
                    <v-col>
                      <DxSelectBox
                        :data-source="dtDepartamento"
                        value-expr="idDpto"
                        display-expr="descripcion"
                        hint="Area"
                        :show-clear-button="true"
                        placeholder="Estado Civil"
                      />
                    </v-col>
                    <v-col>
                      <v-autocomplete
                        :items="dtDepartamento"
                        base-color="indigo"
                        v-model="cboDepartamento"
                        variant="solo"
                        item-title="descripcion"
                        density="compact"
                        color="indigo"
                        item-value="idDpto"
                        label="Departamento"
                        @update:modelValue="ListarProvincia"
                      ></v-autocomplete>
                    </v-col>
                    <v-col>
                      <v-autocomplete
                        :items="dtProvincia"
                        base-color="indigo"
                        v-model="cboProvincia"
                        variant="solo"
                        item-title="descripcion"
                        density="compact"
                        color="indigo"
                        item-value="idProvincia"
                        label="Provincia"
                          @update:modelValue="ListarDistrito"
                      ></v-autocomplete>
                    </v-col>
                    <v-col>
                      <v-autocomplete
                        :items="dtDistrito"
                        base-color="indigo"
                        v-model="cboDistrito"
                        variant="solo"
                        item-title="descripcion"
                        density="compact"
                        color="indigo"
                        item-value="idDistrito"
                        label="Distrito"
                      ></v-autocomplete>
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
                        :data-source="cboEmpresa"
                        value-expr="idTipoDocumentoId"
                        display-expr="descripcion"
                        hint="Empresa"
                        :show-clear-button="true"
                        placeholder="Empresa"
                      />
                    </v-col>
                    <v-col>
                      <DxSelectBox
                        :data-source="cboNacionalidad"
                        value-expr="idTipoDocumentoId"
                        display-expr="descripcion"
                        hint="Nacionalidad"
                        :show-clear-button="true"
                        placeholder="Nacionalidad"
                      />
                    </v-col>
                    <v-col>
                      <DxSelectBox
                        :data-source="cboEstado"
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
                        :value="dateFechaIngreso"
                        :input-attr="{ 'aria-label': 'Date' }"
                        type="date"
                      />
                    </v-col>
                    <v-col>
                      <DxSelectBox
                        :data-source="cboTipoTrabajador"
                        value-expr="idTipoDocumentoId"
                        display-expr="descripcion"
                        hint="Tipo Documento"
                        :show-clear-button="true"
                        placeholder="Tipo Trabajador"
                      />
                    </v-col>
                    <v-col>
                      <DxSelectBox
                        :data-source="cboContrato"
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
                        :data-source="cboArea"
                        value-expr="idTipoDocumentoId"
                        display-expr="descripcion"
                        hint="Tipo Documento"
                        :show-clear-button="true"
                        placeholder="Area"
                      />
                    </v-col>
                    <v-col>
                      <DxSelectBox
                        :data-source="cboCargo"
                        value-expr="idTipoDocumentoId"
                        display-expr="descripcion"
                        hint="Tipo Documento"
                        :show-clear-button="true"
                        placeholder="Cargo"
                      />
                    </v-col>
                    <v-col>
                      <DxSelectBox
                        :data-source="cboRegimenLaboral"
                        value-expr="idTipoDocumentoId"
                        display-expr="descripcion"
                        hint="Area"
                        :show-clear-button="true"
                        placeholder="Régimen Laboral"
                      />
                    </v-col>
                    <v-col>
                      <DxSelectBox
                        :data-source="cboCese"
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
    </v-container>
      <v-footer>
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
      </v-footer>
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
      dtDepartamento: [],
      dtProvincia: [],
      dtDistrito: [],
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
    this.ListarDepartamento();
  },

  methods: {
    async ListarTipoDocumento() {
      this.$axios.get("TipoDocumento/Listar").then((response) => {
        this.dtTipoDocumento = response.data;
        console.log(response.data);
      });
    },
    async ListarDepartamento() {
      this.$axios.get("Direccion/Departamento").then((response) => {
        this.dtDepartamento = response.data;
      });
    },
    async ListarProvincia() {
      this.$axios
        .get("Direccion/Provincia/" + this.cboDepartamento)
        .then((response) => {
          this.dtProvincia = response.data;
        });
    },
    async ListarDistrito() {
      this.$axios
        .get("Direccion/Distrito/" + this.cboProvincia)
        .then((response) => {
          this.dtDistrito = response.data;
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
