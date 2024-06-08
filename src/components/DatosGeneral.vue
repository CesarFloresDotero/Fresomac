<template>
  <v-card class="elevation-4">
    <v-tabs v-model="tab" bg-color="indigo">
      <v-tab value="one">Datos Generales</v-tab>
      <v-tab value="two">Item Two</v-tab>
      <v-tab value="three">Item Three</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
          <v-container fluid>
            <v-card
              class="pa-3"
              color="indigo"
              hover
              elevation="3"
              variant="outlined"
            >
              <v-row>
                <v-col cols="6" xs="3" md="5" sm="5" xl="3">
                  <v-autocomplete
                    v-model="cboArea"
                    :items="dtArea"
                    density="compact"
                    variant="solo"
                    clearable
                    item-title="descripcion"
                    label="Area"
                    class="text-body-2 mt-3"
                    item-value="idArea"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="6" xs="5" md="5" sm="5" xl="3">
                  <v-autocomplete
                    v-model="cboCargo"
                    :items="dtCargo"
                    density="compact"
                    variant="solo"
                    clearable
                    label="Cargo"
                    item-title="descripcion"
                    class="text-body-2 mt-3"
                    item-value="idCargo"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="6" xs="6" md="5" sm="5" xl="3">
                  <v-autocomplete
                    v-model="cboEmpresa"
                    :items="dtEmpresa"
                    density="compact"
                    variant="solo"
                    label="Empresa"
                    clearable
                    item-title="razonSocial"
                    class="text-body-2 mt-3"
                    item-value="idEmpresa"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="6" xs="6" md="5" sm="5" xl="3">
                  <v-autocomplete
                    v-model="cboPais"
                    :items="dtPais"
                    density="compact"
                    variant="solo"
                    label="País"
                    clearable
                    item-title="descripcion"
                    class="text-body-2 mt-3"
                    item-value="idPais"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="txtsueldo"
                    class="text-body-2"
                    color="primary"
                    clearable
                    prepend-icon="payments"
                    variant="outlined"
                    density="compact"
                    placeholder="Remuneración"
                    label="Remuneración"
                    prefix="S/"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card>
          </v-container>
        </v-window-item>

        <v-window-item value="two"> Two </v-window-item>

        <v-window-item value="three"> Three </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    tab: null,
    dtArea: [],
    dtCargo: [],
  }),
};
</script>
<style></style>
