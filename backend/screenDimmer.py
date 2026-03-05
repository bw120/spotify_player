import RPi.GPIO as GPIO
import atexit

# Pin configuration
PWM_PIN = 12 
FREQUENCY = 1000  # 1 kHz

# Global PWM object
_pwm = None
_initialized = False

def _initialize():
    """Initialize GPIO and PWM if not already initialized."""
    global _pwm, _initialized
    
    if _initialized:
        return
    
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(PWM_PIN, GPIO.OUT)
    _pwm = GPIO.PWM(PWM_PIN, FREQUENCY)
    _pwm.start(0)  # Start with 0% (no dimming)
    _initialized = True
    
    # Register cleanup on exit
    atexit.register(cleanup)

def set_dim_level(level):
    """
    Set the screen dimmer to a specified brightness level.
    
    Args:
        level (float): Brightness level from 0 to 100
                      0 = fully dimmed/off
                      100 = fully bright/no dimming
    
    Returns:
        bool: True if successful
    """
    if not (0 <= level <= 100):
        raise ValueError("Dim level must be between 0 and 100")
    
    _initialize()
    _pwm.ChangeDutyCycle(level)
    print(f"Screen dimmer set to {level}%")
    return True

def cancel_dimming():
    """
    Stop dimming and return screen to full brightness.
    
    Returns:
        bool: True if successful
    """
    if _initialized and _pwm:
        _pwm.ChangeDutyCycle(100)
        print("Screen dimming cancelled - full brightness restored")
        return True
    return False

def cleanup():
    """Clean up GPIO resources."""
    global _pwm, _initialized
    
    if _initialized:
        if _pwm:
            _pwm.stop()
        GPIO.cleanup()
        _initialized = False
        print("Screen dimmer cleaned up")

# If run as a standalone script, demonstrate functionality
if __name__ == "__main__":
    import time
    
    try:
        print("Testing screen dimmer...")
        print("Setting to 50% brightness")
        set_dim_level(50)
        time.sleep(5)
        
        print("Setting to 25% brightness")
        set_dim_level(25)
        time.sleep(5)
        
        print("Cancelling dimming (100% brightness)")
        cancel_dimming()
        time.sleep(5)
        
    except KeyboardInterrupt:
        print("\nInterrupted by user")
    finally:
        cleanup()


