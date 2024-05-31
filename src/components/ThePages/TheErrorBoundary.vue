<template>
    <div v-if="hasError">
      <h2>Something went wrong.</h2>
      <p>Please try refreshing the page or contact support.</p>
    </div>
    <div v-else>
      <slot></slot>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        hasError: false
      };
    },
    errorCaptured(error, vm, info) {
      // Update state to indicate that an error occurred
      this.hasError = true;
      // Log the error
      console.error("Error caught by ErrorBoundary:", error, info);
      // Prevent the error from propagating further
      return false;
    }
  };
  </script>
  