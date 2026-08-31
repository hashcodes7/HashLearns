css = """
/* --- CUSTOM FOOTER FIX --- */
.custom-footer {
  background-color: transparent;
  padding: 3rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 4rem;
}

.custom-footer__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.custom-footer__logo .custom-footer__title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #ffffff;
  text-decoration: none;
}
.custom-footer__logo a:hover {
  text-decoration: none;
}

.custom-footer__links {
  display: flex;
  gap: 2rem;
  font-weight: 600;
}

.custom-footer__links a {
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.2s ease;
}

.custom-footer__links a:hover {
  color: var(--ifm-color-primary-light);
}

.custom-footer__socials {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.custom-footer__socials svg {
  color: #ffffff;
  transition: color 0.2s ease;
}

.custom-footer__socials a:hover svg {
  color: var(--ifm-color-primary-light);
}

.custom-footer__copyright {
  text-align: center;
  margin-top: 3rem;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}
"""

with open('src/css/custom.css', 'a', encoding='utf-8') as f:
    f.write(css)
