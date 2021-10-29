<template>
    <div class="py-5 mx-auto" style="max-width:900px; min-height: 450px">
        <v-expansion-panels dark accordion>
            <v-expansion-panel
            v-for="(item,i) in 5"
            :key="i"
            class="elevation-0"
            >
            <v-expansion-panel-header class="secondary white--text">
                Item
            </v-expansion-panel-header>
            <v-expansion-panel-content  class="white black--text py-3">
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </div>
                
            </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>  
</template>