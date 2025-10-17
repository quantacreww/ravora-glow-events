import { motion } from "framer-motion";
import { MenuItem } from "@/lib/menu-data";

interface MenuCardProps {
  item: MenuItem;
  index: number;
}

const MenuCard = ({ item, index }: MenuCardProps) => {
  const getImage = (imageName: string) => {
    try {
      return new URL(`../assets/menu/${imageName}.jpg`, import.meta.url).href;
    } catch {
      return "";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass rounded-2xl overflow-hidden group hover:glow-pink transition-all duration-300"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={getImage(item.image)}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-gradient-primary">
          {item.name}
        </h3>
        <p className="text-muted-foreground mb-4">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">{item.price}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuCard;
