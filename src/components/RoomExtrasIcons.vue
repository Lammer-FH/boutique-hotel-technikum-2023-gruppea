<!-- RoomExtrasIcons.vue -->
<template>
    <div class="room-extras">
        <i v-for="extraObj in roomExtras" :key="Object.keys(extraObj)[0]">
            <span class="tooltip-text">{{ Object.keys(extraObj)[0] }}</span>
            <button class="icon-button">
                <!-- Für Font Awesome Icons -->
                <i v-if="extraToIcon(extraObj).library === 'fa'" :class="extraToIcon(extraObj).icon"></i>
                <!-- Für Bootstrap Icons -->
                <i v-else-if="extraToIcon(extraObj).library === 'bi'" :class="extraToIcon(extraObj).icon"></i>
                <span class="tooltip-text">{{ Object.keys(extraObj)[0] }}</span>
            </button>
        </i>
    </div>
</template>
  
<script>
import "bootstrap-icons/font/bootstrap-icons.css";
import { ref } from 'vue';

export default {
    props: {
        roomExtras: {
            type: Array,
            default: () => [],
        },
    },
    setup(props) {
        const roomExtras = ref(props.roomExtras);

        const EXTRAS = {
            BATHROOM: "bathroom",
            MINIBAR: "minibar",
            TELEVISION: "television",
            LIVINGROOM: "livingroom",
            AIRCONDITION: "aircondition",
            WIFI: "wifi",
            BREAKFAST: "breakfast",
            HANDICAPPED_ACCESSIBLE: "handicapped_accessible",
        };

        const extraToIcon = (extraName) => {
            const mapping = {
                [EXTRAS.BATHROOM]: { library: "fa", icon: "fa fa-bath" },
                [EXTRAS.MINIBAR]: { library: "fa", icon: "fa-solid fa-wine-glass" },
                [EXTRAS.TELEVISION]: { library: "bi", icon: "bi-tv" },
                [EXTRAS.LIVINGROOM]: { library: "fa", icon: "fa-solid fa-couch" },
                [EXTRAS.AIRCONDITION]: { library: "fa", icon: "fa-solid fa-fan" },
                [EXTRAS.WIFI]: { library: "bi", icon: "bi-wifi" },
                [EXTRAS.BREAKFAST]: { library: "fa", icon: "fa-solid fa-mug-saucer" },
                [EXTRAS.HANDICAPPED_ACCESSIBLE]: {
                    library: "bi",
                    icon: "bi-person-wheelchair",
                },
            };
            const key = Object.keys(extraName)[0];
            // const keyUpperCase = key.toUpperCase();
            const formattedKey = key.toUpperCase().replace(' ', '_');
            
            // console.log('EXTRAS[key]:', EXTRAS[key]);
            // console.log('key:', key);
            return mapping[EXTRAS[formattedKey]] || { library: "bi", icon: "bi-question" };
            // return mapping[EXTRAS[keyUpperCase]] || { library: "bi", icon: "bi-question" };
        };

        return {
            roomExtras,
            extraToIcon,
        };
    },
};
</script>

<style scoped>
.room-extras {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    flex-grow: 1;
}

.icon-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.8rem;
    color: #0065fcae;
    transition: color 0.3s;
}

.icon-button:hover {
    color: #0563f9;
}
</style>



  