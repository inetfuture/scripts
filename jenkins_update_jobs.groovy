for (item in Hudson.instance.items) {
  notification = item.properties.find { it.getKey().getClass() == com.tikal.hudson.plugins.notification.HudsonNotificationPropertyDescriptor }
  if (notification == null) {
    continue
  }

  println(">>>>>>>> Update notification plugin of $item.name")
  notification.getValue().getEndpoints()[0].setEvent("completed")
  item.save()
}
