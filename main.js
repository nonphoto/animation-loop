/**
 * A class for starting and stopping an animation frame loop.
 */
class AnimationLoop {

  /**
   * Create a new animation loop driver with the given callback.
   * @param {function} callback - The function to call when an animation frame fires.
   */
  constructor( callback ) {
    this.boundUpdate = ( t ) => { this.update( t ) }
    this.callback = callback

    this.animationRequest = null
    this.t = 0
  }

  /**
   * Start the animation frame loop.
   */
  start() {
    if ( !this.animationRequest ) {
      this.t = performance.now()
      this.animationRequest = window.requestAnimationFrame( this.boundUpdate )
    }
  }

  /**
   * Stop the animation frame loop.
   */
  stop() {
    if ( this.animationRequest ) {
      window.cancelAnimationFrame( this.animationRequest )
      this.animationRequest = null
    }
  }

  /**
   * Handle the animation frame event and call the callback function.
   * @param {DOMHighResTimeStamp} t - The timestamp for the frame.
   */
  update( t ) {
    const dt = t - this.t
    this.t = t

    if ( typeof this.callback === 'function' ) {
      this.callback( t, dt )
    }

    this.animationRequest = window.requestAnimationFrame( this.boundUpdate )
  }
}

module.exports = AnimationLoop
