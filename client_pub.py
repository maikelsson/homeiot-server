import paho.mqtt.client as paho
import time
import random
import json

broker = "broker.hivemq.com"
port = 1883


# example payload
# {"ID": "anturi_1", "data": {"temperature": 23.2, "humidity": 23}}


def on_publish(client, userdata, result):
    print("Message published")
    pass


client = paho.Client("admin")
client.on_publish = on_publish
client.connect(broker, port)

print("Begin message queue...")

for i in range(20):

    data = {
			"name": "test-node",
      "data": {
				"brightness": random.randint(50, 100),
				"humidity": random.randint(50, 88),
				"temperature": random.randint(19, 24)
			}
    }

    json_str = json.dumps(data)

    time.sleep(3)
    client.publish("mikael/test", json_str)

print("End message queue...")
