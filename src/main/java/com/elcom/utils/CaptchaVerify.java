package com.elcom.utils;

import com.elcom.config.web.Log;
import java.awt.Color;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.geom.AffineTransform;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.util.Base64;
import javax.imageio.ImageIO;

public class CaptchaVerify {
  public static String paintText(String draw, int x, int y) {
    String txtBase64 = "";
    try {
      BufferedImage image = new BufferedImage(x, y, 2);
      Graphics2D g2 = image.createGraphics();
      g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
      g2 = image.createGraphics();
      g2.setColor(Color.black);
      g2.fillRect(0, 0, x, y);
      FontMetrics fm = g2.getFontMetrics();
      int scale = y / fm.getHeight();
      Font font = g2.getFont().deriveFont(0, AffineTransform.getScaleInstance(scale, scale));
      g2.setFont(font);
      g2.setColor(Color.WHITE);
      fm = g2.getFontMetrics(font);
      int xPos = (x - fm.stringWidth(draw)) / 2;
      int yPos = (y - fm.getHeight()) / 2 + fm.getAscent();
      g2.drawString(draw, xPos, yPos);
      g2.dispose();
      ByteArrayOutputStream baos = new ByteArrayOutputStream();
      ImageIO.write(image, "png", baos);
      baos.close();
      byte[] imageInByte = baos.toByteArray();
      txtBase64 = Base64.getEncoder().encodeToString(imageInByte);
    } catch (Exception e) {
      Log.log().error("CaptchaVerify.paintText ==> error : ", e);
    } 
    return txtBase64;
  }
}
